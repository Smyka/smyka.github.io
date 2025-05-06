// Loading transition
window.addEventListener("load", function () {
	setTimeout(() => {
		document.getElementById("loading").style.opacity = "0";
		setTimeout(() => {
			document.getElementById("loading").style.display = "none";
			fetchAndGenerateCards();
		}, 1000);
	}, 1500);
});

// Setup 3D canvas background
const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x222244, 0.5));
const dirLight = new THREE.DirectionalLight(0x00c3ff, 0.8);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

const pointLight1 = new THREE.PointLight(0xff0055, 1, 10);
pointLight1.position.set(-2, 1, 3);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00c3ff, 1, 10);
pointLight2.position.set(2, -1, 3);
scene.add(pointLight2);

const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
	positions[i * 3] = (Math.random() - 0.5) * 20;
	positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
	positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
	sizes[i] = Math.random() * 0.1;
}
particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
const particleMaterial = new THREE.PointsMaterial({
	color: 0x00c3ff,
	size: 0.1,
	transparent: true,
	blending: THREE.AdditiveBlending,
	sizeAttenuation: true,
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

const gridHelper = new THREE.GridHelper(20, 20, 0xff0055, 0x00c3ff);
gridHelper.position.y = -3;
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
const wireframe = new THREE.WireframeGeometry(sphereGeometry);
const wireframeSphere = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({
	color: 0xff0055,
	transparent: true,
	opacity: 0.1,
}));
wireframeSphere.position.set(-5, 0, -5);
scene.add(wireframeSphere);

const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshPhongMaterial({
	color: 0x00c3ff,
	emissive: 0x00c3ff,
	emissiveIntensity: 0.2,
	transparent: true,
	opacity: 0.5,
	wireframe: true
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(4, 0, -3);
scene.add(cube);

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
window.addEventListener("mousemove", e => {
	mouseX = (e.clientX / window.innerWidth) * 2 - 1;
	mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
	requestAnimationFrame(animate);
	for (let i = 0; i < particleCount; i++) {
		positions[i * 3 + 2] += 0.01;
		if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
	}
	particleSystem.geometry.attributes.position.needsUpdate = true;
	targetX = mouseX * 0.2;
	targetY = mouseY * 0.2;
	camera.position.x += (targetX - camera.position.x) * 0.05;
	camera.position.y += (targetY - camera.position.y) * 0.05;
	camera.lookAt(scene.position);
	wireframeSphere.rotation.x += 0.003;
	wireframeSphere.rotation.y += 0.005;
	cube.rotation.x += 0.007;
	cube.rotation.y += 0.005;
	renderer.render(scene, camera);
}
animate();

// Dynamic card generation
const apiUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgji_cAgIcmO2vSnf-uveK_8gnZDYOq0-RCtnI1FdnRApf1zc2cW4pwZ5kGRRG9giZV7pRSWmJgvw840M-QbtFUPH31thmPtSTa2UHVHuNJ8WxcEM7YqNW4ySG4YfbtbtHS64Cvs4J-MPn1EPYj7Rd2qMZgNyK_b7hxxJwg_E4jL8mfYhN5gp4hGspQhQELIm0zagNcS7D5yIRBSwsfuBt8beskPqwCj3QXGCYs6Lds6_Om4aJuyYtFP6-HD22WDg6QHYLMqHpcdiQvphq9NPGmE1xZBw&lib=MW2Zpiu80aWS3kKhYiTYcyzcqYDhQuE81";

function createCard(name, data, rank) {
	const card = document.createElement("div");
	card.className = "card-container";
	card.innerHTML = `
		<div class="card">
			<div class="card-face card-front">
				<div class="card-inner-curve" style="background: url('${data.image}') center center / cover no-repeat;">
					<div class="card-footer">
						<button class="card-button">#${rank + 1}</button>
					</div>
				</div>
				<div class="glow-effect"></div>
				<div class="edge-highlight"></div>
				<div class="scanline"></div>
				<div class="glitch"></div>
				<div class="hologram-effect"></div>
			</div>
		</div>
	`;
	document.getElementById("cards-wrapper").appendChild(card);
}




function fetchAndGenerateCards() {
	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			const wrapper = document.getElementById("cards-wrapper");
			wrapper.innerHTML = "";

			const entries = Object.entries(data)
				.sort((a, b) => b[1].score - a[1].score); // sort by score

			for (let i = 0; i < entries.length; i++) {
				const [name, details] = entries[i];
				createCard(name, details, i);
			}
		})
		.catch(err => {
			console.error("API Fetch Failed:", err);
		});
}



// Initial fetch after loading screen
setTimeout(() => {
	fetchAndGenerateCards();
	// Set interval for auto-refresh
	setInterval(fetchAndGenerateCards, 10000); // every 30 seconds
}, 2500);

