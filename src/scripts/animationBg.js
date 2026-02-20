import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0a0a0f, 1);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.8,
    0.4,
    0.85
);
composer.addPass(bloomPass);

// Mouse tracking
const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();
let scrollY = 0;

// Geometric shapes
const shapes = [];
const shapeCount = 15;
const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8),
    new THREE.DodecahedronGeometry(1, 0)
];

const colors = [0x00d4ff, 0xff6b35, 0x00ff88, 0xff0088];

for (let i = 0; i < shapeCount; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (Math.random() - 0.5) * 60;
    mesh.position.y = (Math.random() - 0.5) * 60;
    mesh.position.z = (Math.random() - 0.5) * 40 - 10;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() * 2 + 0.5;
    mesh.scale.set(scale, scale, scale);

    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02
        },
        originalPosition: mesh.position.clone(),
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2
    };

    shapes.push(mesh);
    scene.add(mesh);
}

// Particle system
const particleCount = 800;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleSizes = new Float32Array(particleCount);
const particleColors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 100;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20;

    particleSizes[i] = Math.random() * 3 + 1;

    const colorChoice = Math.random();
    if (colorChoice < 0.5) {
        particleColors[i * 3] = 0;
        particleColors[i * 3 + 1] = 0.83;
        particleColors[i * 3 + 2] = 1;
    } else if (colorChoice < 0.8) {
        particleColors[i * 3] = 1;
        particleColors[i * 3 + 1] = 0.42;
        particleColors[i * 3 + 2] = 0.21;
    } else {
        particleColors[i * 3] = 0;
        particleColors[i * 3 + 1] = 1;
        particleColors[i * 3 + 2] = 0.53;
    }
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
particleGeometry.setAttribute('aColor', new THREE.BufferAttribute(particleColors, 3));

const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() }
    },
    vertexShader: `
                attribute float size;
                attribute vec3 aColor;
                varying vec3 vColor;
                uniform float uTime;
                uniform float uPixelRatio;
                
                void main() {
                    vColor = aColor;
                    vec3 pos = position;
                    pos.y += sin(uTime * 0.5 + position.x * 0.1) * 2.0;
                    pos.x += cos(uTime * 0.3 + position.z * 0.1) * 1.5;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
    fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha *= 0.8;
                    
                    vec3 glow = vColor * (1.0 + 0.5 * (1.0 - dist * 2.0));
                    gl_FragColor = vec4(glow, alpha);
                }
            `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Connection lines
const lineGeometry = new THREE.BufferGeometry();
const linePositions = new Float32Array(100 * 6);
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.15
});

const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lines);

// Cursor glow
const cursorGlow = document.getElementById('cursorGlow');

// Event listeners
document.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Project card 3D tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Animation
const clock = new THREE.Clock();

function updateLines() {
    const positions = lines.geometry.attributes.position.array;
    let lineIndex = 0;
    const maxLines = 50;
    const maxDistance = 20;

    for (let i = 0; i < shapes.length && lineIndex < maxLines; i++) {
        for (let j = i + 1; j < shapes.length && lineIndex < maxLines; j++) {
            const dist = shapes[i].position.distanceTo(shapes[j].position);
            if (dist < maxDistance) {
                positions[lineIndex * 6] = shapes[i].position.x;
                positions[lineIndex * 6 + 1] = shapes[i].position.y;
                positions[lineIndex * 6 + 2] = shapes[i].position.z;
                positions[lineIndex * 6 + 3] = shapes[j].position.x;
                positions[lineIndex * 6 + 4] = shapes[j].position.y;
                positions[lineIndex * 6 + 5] = shapes[j].position.z;
                lineIndex++;
            }
        }
    }

    lines.geometry.attributes.position.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smooth mouse following
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Update shapes
    shapes.forEach((shape, i) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;

        // Float animation
        const floatY = Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 2;
        const floatX = Math.cos(time * shape.userData.floatSpeed * 0.7 + shape.userData.floatOffset) * 1;

        shape.position.y = shape.userData.originalPosition.y + floatY;
        shape.position.x = shape.userData.originalPosition.x + floatX;

        // React to mouse
        shape.position.x += mouse.x * 3;
        shape.position.y += mouse.y * 3;
    });

    // Update particles
    particleMaterial.uniforms.uTime.value = time;

    // Camera follows scroll
    camera.position.y = -scrollY * 0.02;
    camera.position.x = mouse.x * 5;
    camera.position.y += mouse.y * 3;

    // Update connection lines
    updateLines();

    composer.render();
}

// Hide loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 500);
});

animate();

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .about-text, .skills').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});