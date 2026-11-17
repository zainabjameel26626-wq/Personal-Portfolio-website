// Dark mode (remembers the choice when storage is available)
const root = document.documentElement, toggle = document.getElementById("themeToggle");
function setTheme(t) {
  root.setAttribute("data-bs-theme", t);
  toggle.innerHTML = `<i class="bi bi-${t === "dark" ? "sun" : "moon-stars"}"></i>`;
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = "light"; try { saved = localStorage.getItem("theme") || "light"; } catch (e) {}
setTheme(saved);
toggle.addEventListener("click", () => setTheme(root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"));

// Project modal: loads the demo video when opened, stops it when closed
const modal = document.getElementById("projectModal"), video = document.getElementById("pmVideo"), note = document.getElementById("pmNote");
modal.addEventListener("show.bs.modal", e => {
  const d = e.relatedTarget.dataset;
  document.getElementById("pmTitle").textContent = d.title;
  document.getElementById("pmDesc").textContent = d.desc;
  document.getElementById("pmGh").href = d.gh;
  const base = d.video.replace(/\.[^.]+$/, "");
  document.getElementById("pmFile").textContent = d.video;
  note.classList.add("d-none"); video.classList.remove("d-none");
  video.innerHTML = ["mp4", "webm", "mov"].map(x => `<source src="${base}.${x}">`).join("");
  // the last <source> fires "error" only when none of the formats could be loaded
  video.lastElementChild.addEventListener("error", () => { video.classList.add("d-none"); note.classList.remove("d-none"); });
  video.load();
});
modal.addEventListener("hidden.bs.modal", () => { video.pause(); video.innerHTML = ""; video.load(); });

// Back to top
const backTop = document.getElementById("backToTop");
addEventListener("scroll", () => backTop.classList.toggle("show", scrollY > 400));
backTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// Contact form: validates, then opens the visitor's email app with the message filled in
const form = document.getElementById("contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  form.classList.add("was-validated");
  if (!form.checkValidity()) return;
  const v = id => document.getElementById(id).value.trim();
  const body = `${v("fMsg")}\n\n— ${v("fName")} (${v("fEmail")})`;
  location.href = `mailto:zainabjameel9296226@gmail.com?subject=${encodeURIComponent(v("fSubject"))}&body=${encodeURIComponent(body)}`;
  document.getElementById("formAlert").innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Opening your email app to send the message.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
});
