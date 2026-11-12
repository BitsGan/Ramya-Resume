import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Eye, RotateCw, ZoomIn, Layers, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ThreeCanvasProps {
  onSelectNode?: (nodeName: string) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ onSelectNode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'iso' | 'front' | 'top'>('iso');
  const [explodeValue, setExplodeValue] = useState(0);
  const [activeTechFocus, setActiveTechFocus] = useState<string>('All');
  const [isRotating, setIsRotating] = useState(true);

  // References for render loop state
  const sceneStateRef = useRef<{
    controls?: OrbitControls;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    explodeFactor: number;
    subsystems: {
      baseGroup: THREE.Group;
      screenGroup: THREE.Group;
      coreGroup: THREE.Group;
      ringsGroup: THREE.Group;
      floatingNodes: THREE.Group[];
      pedestal: THREE.Mesh;
    } | null;
    floatingNodeData: { group: THREE.Group; originalY: number; speed: number; phase: number; name: string }[];
    isSoftwareGl: boolean;
    autoRotate: boolean;
  }>({
    targetCamPos: new THREE.Vector3(5.5, 4.2, 5.5),
    targetLookAt: new THREE.Vector3(0, 1.2, 0),
    explodeFactor: 0,
    subsystems: null,
    floatingNodeData: [],
    isSoftwareGl: false,
    autoRotate: true
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL detection
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    sceneStateRef.current.isSoftwareGl = isSoftwareGl;

    // 2. Scene & Fog Setup
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x000000);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    // 3. Camera Setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5.5, 4.2, 5.5);
    sceneStateRef.current.camera = camera;

    // 4. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    sceneStateRef.current.renderer = renderer;

    // 5. Studio Environment Map (RoomEnvironment with PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Balanced Studio Rig
    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 4;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
    }
    scene.add(keyLight);

    // Cool Fill Light (Hemisphere: Cyan & Obsidian)
    const hemiLight = new THREE.HemisphereLight(0x06b6d4, 0x09090b, 1.3);
    scene.add(hemiLight);

    // Rim Backlight (Electric Emerald)
    const rimLight = new THREE.DirectionalLight(0x10b981, 2.4);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // 7. Ground Grid & Contact Shadow Grounding
    // Soft radial contact shadow plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const gradient = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = gradient;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const contactShadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    scene.add(contactShadow);

    // Subtle technological ground grid with emerald/zinc accents
    const grid = new THREE.GridHelper(14, 28, 0x10b981, 0x27272a);
    grid.position.y = 0;
    scene.add(grid);

    // 8. Procedural Textures for Terminal / Code Stream
    const createCodeTexture = (textLines: string[], title: string) => {
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 320;
      const ctx = cv.getContext('2d')!;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, 512, 320);

      // Header bar
      ctx.fillStyle = '#121214';
      ctx.fillRect(0, 0, 512, 34);

      // Window dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(20, 17, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(36, 17, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(52, 17, 5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillText(title, 75, 22);

      // Content
      ctx.font = '13px "JetBrains Mono", monospace';
      textLines.forEach((line, idx) => {
        if (line.includes('class') || line.includes('import') || line.includes('public')) {
          ctx.fillStyle = '#34d399';
        } else if (line.includes('return') || line.includes('override') || line.includes('const')) {
          ctx.fillStyle = '#06b6d4';
        } else if (line.includes('"')) {
          ctx.fillStyle = '#fbbf24';
        } else {
          ctx.fillStyle = '#e4e4e7';
        }
        ctx.fillText(line, 22, 65 + idx * 24);
      });

      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const javaCodeTex = createCodeTexture([
      'public class DeveloperHub {',
      '  private final String name = "Anthati Ramya";',
      '  private final String role = "Full Stack Java";',
      '  public void deployMatrix() {',
      '    SpringApplication.run(Hub.class);',
      '    System.out.println("Java 21 Ready");',
      '  }',
      '}'
    ], 'AnthatiRamya.java — FullStackEngine');

    const flutterCodeTex = createCodeTexture([
      'class MathMatrixApp extends StatelessWidget {',
      '  @override',
      '  Widget build(BuildContext ctx) {',
      '    return MaterialApp(',
      '      home: BrainTrainingGrid(),',
      '      theme: MatrixDarkTheme(),',
      '    );',
      '  }',
      '}'
    ], 'MathMatrix.dart — FlutterEngine');

    // 9. Composite 3-12 Part Procedural Model: "The Developer Engine Hub"
    const mainSubject = new THREE.Group();
    scene.add(mainSubject);

    // Group 1: Base & Pedestal
    const baseGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(2.0, 2.2, 0.25, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.9,
      roughness: 0.18
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = 0.125;
    pedestal.receiveShadow = !isSoftwareGl;
    baseGroup.add(pedestal);

    // Emerald ring accent on pedestal
    const ringAccentGeo = new THREE.TorusGeometry(2.05, 0.03, 16, 64);
    const ringAccentMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.08,
      emissive: 0x059669,
      emissiveIntensity: 0.7
    });
    const ringAccent = new THREE.Mesh(ringAccentGeo, ringAccentMat);
    ringAccent.rotation.x = Math.PI / 2;
    ringAccent.position.y = 0.24;
    baseGroup.add(ringAccent);

    // Keyboard / Input Console Deck
    const deckGeo = new THREE.BoxGeometry(1.4, 0.08, 0.8);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.7,
      roughness: 0.35
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 0.32, 0.85);
    deck.rotation.x = 0.12;
    baseGroup.add(deck);

    // Keyboard Keycap array on deck
    const keyRows = 4;
    const keysPerRow = 12;
    const keyGeo = new THREE.BoxGeometry(0.08, 0.03, 0.08);
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.2,
      roughness: 0.6
    });
    const keysGroup = new THREE.Group();
    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keysPerRow; c++) {
        const keyMesh = new THREE.Mesh(keyGeo, keyMat);
        keyMesh.position.set(
          -0.55 + c * 0.1,
          0.04,
          -0.2 + r * 0.12
        );
        keysGroup.add(keyMesh);
      }
    }
    deck.add(keysGroup);
    mainSubject.add(baseGroup);

    // Group 2: Central Holographic Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 1.1, 0);

    // Core glass housing
    const coreCylinderGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.3, 32);
    const coreGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.4 : 0.9,
      ior: 1.5,
      thickness: 0.8
    });
    const coreCylinder = new THREE.Mesh(coreCylinderGeo, coreGlassMat);
    coreGroup.add(coreCylinder);

    // Inner pulsating reactor orb
    const innerOrbGeo = new THREE.IcosahedronGeometry(0.3, 2);
    const innerOrbMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: true
    });
    const innerOrb = new THREE.Mesh(innerOrbGeo, innerOrbMat);
    coreGroup.add(innerOrb);

    // Cooling Heat Sink Fins around core top
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.18
    });
    for (let f = 0; f < 8; f++) {
      const angle = (f / 8) * Math.PI * 2;
      const finGeo = new THREE.BoxGeometry(0.08, 0.25, 0.2);
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(Math.cos(angle) * 0.62, 0.65, Math.sin(angle) * 0.62);
      fin.rotation.y = -angle;
      coreGroup.add(fin);
    }
    mainSubject.add(coreGroup);

    // Group 3: Curved Articulated Display Screens
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 1.45, 0);

    // Monitor 1: Java Display (Left-Center)
    const monitorFrameGeo = new THREE.BoxGeometry(1.6, 1.05, 0.08);
    const monitorFrameMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.85,
      roughness: 0.25
    });
    const monitor1 = new THREE.Mesh(monitorFrameGeo, monitorFrameMat);
    monitor1.position.set(-0.85, 0, 0.1);
    monitor1.rotation.y = 0.28;

    const screen1Geo = new THREE.PlaneGeometry(1.5, 0.95);
    const screen1Mat = new THREE.MeshStandardMaterial({
      map: javaCodeTex,
      metalness: 0.2,
      roughness: 0.3,
      emissive: 0xffffff,
      emissiveMap: javaCodeTex,
      emissiveIntensity: 0.35
    });
    const screen1 = new THREE.Mesh(screen1Geo, screen1Mat);
    screen1.position.z = 0.045;
    monitor1.add(screen1);
    screenGroup.add(monitor1);

    // Monitor 2: Flutter / Dart Display (Right-Center)
    const monitor2 = new THREE.Mesh(monitorFrameGeo, monitorFrameMat);
    monitor2.position.set(0.85, 0, 0.1);
    monitor2.rotation.y = -0.28;

    const screen2Geo = new THREE.PlaneGeometry(1.5, 0.95);
    const screen2Mat = new THREE.MeshStandardMaterial({
      map: flutterCodeTex,
      metalness: 0.2,
      roughness: 0.3,
      emissive: 0xffffff,
      emissiveMap: flutterCodeTex,
      emissiveIntensity: 0.35
    });
    const screen2 = new THREE.Mesh(screen2Geo, screen2Mat);
    screen2.position.z = 0.045;
    monitor2.add(screen2);
    screenGroup.add(monitor2);

    // Articulated Support Arms
    const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.0, 16);
    const armMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.15
    });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.6, -0.6, -0.1);
    leftArm.rotation.z = 0.4;
    screenGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.6, -0.6, -0.1);
    rightArm.rotation.z = -0.4;
    screenGroup.add(rightArm);

    mainSubject.add(screenGroup);

    // Group 4: Orbital Gyro Rings (Secondary Read)
    const ringsGroup = new THREE.Group();
    ringsGroup.position.set(0, 1.2, 0);

    const ring1Geo = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.08,
      emissive: 0x059669,
      emissiveIntensity: 0.6
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.12,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ringsGroup.add(ring2);

    mainSubject.add(ringsGroup);

    // Group 5: Floating Interactive Tech Satellites (Java, Flutter, React, MySQL)
    const techSatellites = [
      { name: 'Java', color: 0xf97316, angle: 0, height: 1.8, dist: 2.6 },
      { name: 'Flutter', color: 0x38bdf8, angle: Math.PI * 0.5, height: 1.3, dist: 2.5 },
      { name: 'MySQL', color: 0x0284c7, angle: Math.PI, height: 1.9, dist: 2.7 },
      { name: 'React', color: 0x61dafb, angle: Math.PI * 1.5, height: 1.4, dist: 2.5 },
    ];

    const createTextSprite = (text: string, colorHex: number) => {
      const cv = document.createElement('canvas');
      cv.width = 256;
      cv.height = 96;
      const ctx = cv.getContext('2d')!;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(8, 8, 240, 80, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 48);

      const texture = new THREE.CanvasTexture(cv);
      texture.colorSpace = THREE.SRGBColorSpace;
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.9, 0.35, 1);
      return sprite;
    };

    const floatingNodes: THREE.Group[] = [];
    const floatingNodeData: { group: THREE.Group; originalY: number; speed: number; phase: number; name: string }[] = [];

    techSatellites.forEach((tech) => {
      const satGroup = new THREE.Group();
      const x = Math.cos(tech.angle) * tech.dist;
      const z = Math.sin(tech.angle) * tech.dist;
      satGroup.position.set(x, tech.height, z);

      // Geometric core
      const coreSatGeo = new THREE.OctahedronGeometry(0.2, 0);
      const coreSatMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        emissive: tech.color,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2
      });
      const coreMesh = new THREE.Mesh(coreSatGeo, coreSatMat);
      satGroup.add(coreMesh);

      // Label sprite
      const sprite = createTextSprite(tech.name, tech.color);
      sprite.position.y = 0.35;
      satGroup.add(sprite);

      mainSubject.add(satGroup);
      floatingNodes.push(satGroup);
      floatingNodeData.push({
        group: satGroup,
        originalY: tech.height,
        speed: 1.5 + Math.random() * 0.8,
        phase: tech.angle,
        name: tech.name
      });
    });

    sceneStateRef.current.subsystems = {
      baseGroup,
      screenGroup,
      coreGroup,
      ringsGroup,
      floatingNodes,
      pedestal
    };
    sceneStateRef.current.floatingNodeData = floatingNodeData;

    // 10. OrbitControls Setup with Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below ground
    controls.minDistance = 3.0;
    controls.maxDistance = 14.0;
    controls.target.set(0, 1.2, 0);
    sceneStateRef.current.controls = controls;

    // 11. Animation & Lossless Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 70);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const _camTarget = new THREE.Vector3();

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera smooth damping towards target position
      if (sceneStateRef.current.camera) {
        camera.position.lerp(sceneStateRef.current.targetCamPos, 1 - Math.exp(-4 * delta));
        _camTarget.lerp(sceneStateRef.current.targetLookAt, 1 - Math.exp(-4 * delta));
        controls.target.copy(_camTarget);
      }

      // Smooth explode transition
      const targetExplode = sceneStateRef.current.explodeFactor;
      if (sceneStateRef.current.subsystems) {
        const { screenGroup, coreGroup, ringsGroup } = sceneStateRef.current.subsystems;
        screenGroup.position.y = THREE.MathUtils.damp(screenGroup.position.y, 1.45 + targetExplode * 1.2, 4, delta);
        coreGroup.position.y = THREE.MathUtils.damp(coreGroup.position.y, 1.1 + targetExplode * 0.6, 4, delta);
        ringsGroup.scale.setScalar(THREE.MathUtils.damp(ringsGroup.scale.x, 1 + targetExplode * 0.4, 4, delta));
      }

      // Gyro ring rotations
      ring1.rotation.z += 0.4 * delta;
      ring1.rotation.y += 0.2 * delta;
      ring2.rotation.y += 0.5 * delta;
      ring2.rotation.x += 0.3 * delta;

      // Inner orb slow tumble
      innerOrb.rotation.y += 0.8 * delta;
      innerOrb.rotation.x += 0.5 * delta;

      // Floating tech nodes gentle bobbing & rotation
      sceneStateRef.current.floatingNodeData.forEach((item) => {
        item.group.position.y = item.originalY + Math.sin(elapsed * item.speed + item.phase) * 0.12;
        item.group.children[0].rotation.y += 0.6 * delta;
        item.group.children[0].rotation.x += 0.4 * delta;
      });

      // Auto rotation of base subject
      if (sceneStateRef.current.autoRotate) {
        mainSubject.rotation.y += 0.15 * delta;
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Camera preset switches
  const handlePresetChange = (preset: 'iso' | 'front' | 'top') => {
    setActivePreset(preset);
    if (!sceneStateRef.current.camera) return;

    if (preset === 'iso') {
      sceneStateRef.current.targetCamPos.set(5.5, 4.2, 5.5);
      sceneStateRef.current.targetLookAt.set(0, 1.2, 0);
    } else if (preset === 'front') {
      sceneStateRef.current.targetCamPos.set(0, 1.5, 5.8);
      sceneStateRef.current.targetLookAt.set(0, 1.3, 0);
    } else if (preset === 'top') {
      sceneStateRef.current.targetCamPos.set(0.1, 8.5, 1.0);
      sceneStateRef.current.targetLookAt.set(0, 0.8, 0);
    }
  };

  // Exploded view slider
  const handleExplodeChange = (val: number) => {
    setExplodeValue(val);
    sceneStateRef.current.explodeFactor = val;
  };

  // Tech node focus
  const handleTechFocus = (techName: string) => {
    setActiveTechFocus(techName);
    if (onSelectNode) onSelectNode(techName);

    const target = sceneStateRef.current.floatingNodeData.find((n) => n.name === techName);
    if (target && sceneStateRef.current.camera) {
      const pos = target.group.position;
      sceneStateRef.current.targetCamPos.set(pos.x * 1.8, pos.y + 0.8, pos.z * 1.8);
      sceneStateRef.current.targetLookAt.copy(pos);
    } else {
      handlePresetChange('iso');
    }
  };

  const toggleRotate = () => {
    const nextState = !isRotating;
    setIsRotating(nextState);
    sceneStateRef.current.autoRotate = nextState;
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[580px] bg-black rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Spec Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span className="text-emerald-400 font-semibold">PBR ENGINE</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Anthati Ramya Core</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-emerald-400">WebGL 60fps</span>
          </div>
        </div>
      </div>

      {/* Top Right Quick Orbit Hint */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 pointer-events-none">
        <div className="px-2.5 py-1 rounded bg-zinc-950/90 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          Drag to orbit · Scroll to zoom
        </div>
      </div>

      {/* Unified Bottom Control Dock (Strict Three.js Skill layout) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[880px] transition-transform duration-300 ${
          isCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Toggle Collapse Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-t-lg hover:text-white transition-colors cursor-pointer shadow-md"
            title={isCollapsed ? 'Expand 3D Controls' : 'Collapse Dock'}
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Show 3D Viewport Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                <span>Minimize Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Surface */}
        <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* View Camera Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 font-medium hidden sm:inline">Camera:</span>
              <div className="flex items-center gap-1 p-0.5 bg-black rounded-lg border border-zinc-850">
                <button
                  onClick={() => handlePresetChange('iso')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    activePreset === 'iso' ? 'bg-emerald-500 text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Isometric
                </button>
                <button
                  onClick={() => handlePresetChange('front')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    activePreset === 'front' ? 'bg-emerald-500 text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => handlePresetChange('top')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    activePreset === 'top' ? 'bg-emerald-500 text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Top-Down
                </button>
              </div>
            </div>

            {/* Exploded View Slider */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Explode:</span>
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodeValue}
                onChange={(e) => handleExplodeChange(parseFloat(e.target.value))}
                className="w-20 sm:w-28 accent-emerald-500 cursor-pointer"
                title="Deconstruct mechanical subsystem layers"
              />
              <span className="font-mono text-zinc-400 text-[11px] w-6">
                {Math.round(explodeValue * 100)}%
              </span>
            </div>

            {/* Tech Satellites Quick Focus */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400 font-medium hidden md:inline">Focus:</span>
              <div className="flex items-center gap-1 p-0.5 bg-black rounded-lg border border-zinc-850">
                {['All', 'Java', 'Flutter', 'React', 'MySQL'].map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleTechFocus(tech)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      activeTechFocus === tech ? 'bg-emerald-500 text-black font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Rotation Toggle */}
            <button
              onClick={toggleRotate}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isRotating
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-black border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
              title={isRotating ? 'Pause scene rotation' : 'Enable scene rotation'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
