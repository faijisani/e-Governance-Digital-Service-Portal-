const STORAGE_KEY = "egovApplications";

// Saved applications get karna
function getApplications() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// Applications save karna
function saveApplications(applications) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

// Service select karne par form par jana
function selectService(serviceName) {
    document.getElementById("service").value = serviceName;

    document.getElementById("apply").scrollIntoView({
        behavior: "smooth"
    });
}

// Application submit
document.getElementById("applicationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const applications = getApplications();

    // Application ID generate
    const id = "APP" + (1001 + applications.length);

    const fileInput = document.getElementById("document");

    const application = {
        id: id,
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        service: document.getElementById("service").value,
        document: fileInput.files.length > 0
            ? fileInput.files[0].name
            : "No document",
        status: "Pending"
    };

    applications.push(application);

    saveApplications(applications);

    document.getElementById("applicationResult").innerHTML =
        '<div class="success">' +
        '<strong>Application submitted successfully!</strong><br><br>' +
        'Your Application ID is: <strong>' + id + '</strong><br>' +
        'Please save this ID to track your application.' +
        '</div>';

    // Form clear
    this.reset();
});


// Application status track karna
function trackApplication() {

    const id = document
        .getElementById("trackId")
        .value
        .trim()
        .toUpperCase();

    const applications = getApplications();

    const application = applications.find(function(item) {
        return item.id === id;
    });

    const result = document.getElementById("statusResult");

    if (!application) {

        result.innerHTML =
            '<div class="warning">' +
            'Application not found. Please check your Application ID.' +
            '</div>';

        return;
    }

    result.innerHTML =
        '<div class="success">' +
        '<strong>Application Details</strong><br><br>' +
        '<strong>Application ID:</strong> ' + application.id + '<br>' +
        '<strong>Applicant:</strong> ' + application.name + '<br>' +
        '<strong>Service:</strong> ' + application.service + '<br>' +
        '<strong>Document:</strong> ' + application.document + '<br>' +
        '<strong>Status:</strong> ' + application.status +
        '</div>';
}