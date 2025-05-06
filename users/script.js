// Loading animation
window.addEventListener("load", function () {
	setTimeout(() => {
		document.getElementById("loading").style.opacity = "0";
		setTimeout(() => {
			document.getElementById("loading").style.display = "none";

			fetchAndRenderCards(); // Initial call
			setInterval(fetchAndRenderCards, 10000); // Auto-refresh every 10s

		}, 1000);
	}, 1500);
});


// Three.js background
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

const point1 = new THREE.PointLight(0xff0055, 1, 10);
point1.position.set(-2, 1, 3);
scene.add(point1);

const point2 = new THREE.PointLight(0x00c3ff, 1, 10);
point2.position.set(2, -1, 3);
scene.add(point2);

// Particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
	positions[i * 3] = (Math.random() - 0.5) * 20;
	positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
	positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}
particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particleSystem = new THREE.Points(
	particles,
	new THREE.PointsMaterial({
		color: 0x00c3ff,
		size: 0.1,
		transparent: true,
		blending: THREE.AdditiveBlending
	})
);
scene.add(particleSystem);

const gridHelper = new THREE.GridHelper(20, 20, 0xff0055, 0x00c3ff);
gridHelper.position.y = -3;
scene.add(gridHelper);

const sphere = new THREE.LineSegments(
	new THREE.WireframeGeometry(new THREE.SphereGeometry(2, 16, 16)),
	new THREE.LineBasicMaterial({ color: 0xff0055, opacity: 0.1, transparent: true })
);
sphere.position.set(-5, 0, -5);
scene.add(sphere);

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1.5, 1.5, 1.5),
	new THREE.MeshPhongMaterial({
		color: 0x00c3ff,
		emissive: 0x00c3ff,
		emissiveIntensity: 0.2,
		opacity: 0.5,
		wireframe: true,
		transparent: true
	})
);
cube.position.set(4, 0, -3);
scene.add(cube);

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
window.addEventListener("mousemove", (e) => {
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

	sphere.rotation.x += 0.003;
	sphere.rotation.y += 0.005;
	cube.rotation.x += 0.007;
	cube.rotation.y += 0.005;

	renderer.render(scene, camera);
}
animate();

// Card Generation
const apiUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhE4lJIi1bK6rh-2U4ve6pemB_LGvP-9KsPDHLIm2sK9Zkzi2DhVqv6XO_sFq-XiymTB5VO4XacNTaQJAFFZ6UeYiZ2OwejOs3o8z27x8FiAOfrIMXk88QQyRikA0m61TDARGeZXXIuPgSAKWJ9NnUEFIkKw2xZG_RisJPoFKF799vP0NuXXXgUwj54GIjdYdYh8OOgLMWTXNKInYfMCXTLWG7Z_A7HTrSVoc8WF9YJ5yANYLekGaO_Y6ZULwsFtkI5ftSdMZql6eA20xPra1-gucycrjVjO_YwLqBj&lib=MhfY9N7dKvf0SSJcP8j6aNCSmmLKcm0TF";

function getRandomGradient() {
	const gradients = [
		"linear-gradient(135deg, #ff0055 0%, #ff8800 100%)", // red-orange
		"linear-gradient(135deg, #00c3ff 0%, #00ffcc 100%)", // blue-cyan
		"linear-gradient(135deg, #ff00cc 0%, #cc00ff 100%)", // pink-purple
		"linear-gradient(135deg, #00ff99 0%, #33ccff 100%)", // green-blue
		"linear-gradient(135deg, #ffaa00 0%, #ff5500 100%)", // yellow-orange
		"linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)", // violet-deep blue
		"linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)", // pink-blue
		"linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)", // dark green-mint
		"linear-gradient(135deg, #f12711 0%, #f5af19 100%)", // red-orange-yellow
		"linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)", // orange-magenta
		"linear-gradient(135deg, #43cea2 0%, #185a9d 100%)", // green-navy
		"linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)", // tri-tone
		"linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)", // cyan-lime
		"linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", // pink-flesh
		"linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // soft retro
		"linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)"  // blue ice
	];
	return gradients[Math.floor(Math.random() * gradients.length)];
}

function extractGlowColor(gradient) {
	const match = gradient.match(/#([0-9a-f]{6})/i);
	return match ? `#${match[1]}` : "#00c3ff";
}


function createCard(user, data) {
	const gradient = getRandomGradient();

	const card = document.createElement("div");
	card.className = "card-container";
	card.innerHTML = `
		<div class="card">
			<div class="card-face card-front">
				<div class="card-inner-curve">
					<div class="card-header">
						<div class="card-chip" style="
							background: ${gradient};
							box-shadow: 0 0 10px ${extractGlowColor(gradient)};
						"></div>
						<h2 class="card-title">${user}</h2>
						<div class="card-subtitle">Rankings</div>
					</div>
					<div class="card-content">
						<ul>
							${Object.keys(data.votes)
								.sort((a, b) => Number(a) - Number(b))
								.map(rank => `<li>#${rank}: ${data.votes[rank]}</li>`)
								.join("")}
						</ul>
					</div>
					<div class="card-footer">
						<div class="card-id">${data.catchphrase || "no catchphrase"}</div>
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




function fetchAndRenderCards() {
	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			document.getElementById("cards-wrapper").innerHTML = "";
			for (const [user, userData] of Object.entries(data)) {
				createCard(user, userData);
			}
		})
		.catch(err => {
			console.error("Failed to fetch data:", err);
		});
}

