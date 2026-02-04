const noJobs = document.getElementById("no-jobs");
const jobsList = document.getElementById("jobs-list");
const jobSelect = document.getElementById("job-select");
const formJobId = document.getElementById("form-job-id");
const languageBtn = document.querySelectorAll(".langBtn");
const availableJobsTitle = document.getElementById("availabe-jobs");
let allJobs = [];
let currentLangs = localStorage.getItem("siteLang"); // اللغة الافتراضية

// تحميل الوظائف
fetch("../js/jobs.json")
  .then((res) => res.json())
  .then((jobs) => {
    allJobs = jobs.filter((j) => j.available);
    renderJobs();
  })
  .catch((err) => {
    console.error("فشل تحميل الوظائف:", err);
    noJobs.textContent = "حدث خطأ في تحميل الوظائف. حاول لاحقًا.";
  });

// رسم الوظائف حسب اللغة
function renderJobs() {
  jobsList.innerHTML = "";
  // jobSelect.innerHTML = '<option value="">اختر الوظيفة</option>';
  const placeholderText =
    currentLangs === "en" ? "Select a job" : "اختر الوظيفة";
  jobSelect.innerHTML = `<option value="" data-key="pick_job">${placeholderText}</option>`;

  if (allJobs.length === 0) {
    jobsList.style.display = "none";
    availableJobsTitle.style.display = "none";
    noJobs.style.display = "block";
    return;
  }
  noJobs.style.display = "none";
  availableJobsTitle.style.display = "block";
  jobsList.style.display = "block";

  allJobs.forEach((job) => {
    const jobTitle = currentLangs === "en" ? job.title_en : job.title;

    // عرض القائمة
    const div = document.createElement("div");
    div.className = "p-4 bg-gray-100 rounded shadow text-primary font-medium";
    div.textContent = jobTitle;
    jobsList.appendChild(div);

    // إضافة للفورم
    const option = document.createElement("option");
    option.value = jobTitle;
    option.textContent = jobTitle;
    option.dataset.id = job.id;
    jobSelect.appendChild(option);
  });
}

// تغيير اللغة
languageBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLangs = btn.textContent.toLocaleLowerCase().trim();
    renderJobs();
  });
});

// ضبط Job ID
jobSelect.addEventListener("change", (e) => {
  const selectedOption = e.target.selectedOptions[0];
  formJobId.value = selectedOption?.dataset.id || "";
});
