let portfolioData = {};

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// Load data
async function loadData() {
    const res = await fetch('/api/portfolio');
    portfolioData = await res.json();
    populateForm();
}

function populateForm() {
    const d = portfolioData;
    // Profile
    document.getElementById('profileName').value = d.profile?.name || '';
    document.getElementById('profileTitle').value = d.profile?.title || '';
    document.getElementById('profileAbout').value = d.profile?.aboutMe || '';
    document.getElementById('profilePhoto').value = d.profile?.photoUrl || '';
    // Education
    document.getElementById('eduDegree').value = d.education?.degree || '';
    document.getElementById('eduCollege').value = d.education?.college || '';
    document.getElementById('eduYear').value = d.education?.year || '';
    // Contact
    document.getElementById('contactEmail').value = d.contact?.email || '';
    document.getElementById('contactPhone').value = d.contact?.phone || '';
    document.getElementById('contactLocation').value = d.contact?.location || '';
    document.getElementById('contactLinkedIn').value = d.contact?.linkedInUrl || '';
    document.getElementById('contactGitHub').value = d.contact?.gitHubUrl || '';
    // Skills
    renderSkills(d.skills || []);
    // Projects
    renderProjects(d.projects || []);
    // Experience
    renderExperience(d.experience || []);
}

// Experience
function renderExperience(experience) {
    const c = document.getElementById('experienceContainer');
    c.innerHTML = '';
    experience.forEach((exp, i) => {
        c.innerHTML += `
        <div class="admin-card" data-exp-index="${i}">
            <button class="btn-remove" onclick="removeExperience(${i})"><i class="fa-solid fa-trash"></i></button>
            <div class="row g-2 mb-2">
                <div class="col-md-6">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-control exp-company" value="${exp.company || ''}" />
                </div>
                <div class="col-md-3">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-control exp-role" value="${exp.role || ''}" />
                </div>
                <div class="col-md-3">
                    <label class="form-label">Duration</label>
                    <input type="text" class="form-control exp-duration" value="${exp.duration || ''}" />
                </div>
            </div>
            <div class="mb-2">
                <label class="form-label">Description</label>
                <textarea class="form-control exp-desc" rows="3">${exp.description || ''}</textarea>
            </div>
        </div>`;
    });
}

function addExperience() {
    const exp = collectExperience();
    exp.push({ company: '', role: '', duration: '', description: '' });
    renderExperience(exp);
}

function removeExperience(i) {
    const exp = collectExperience();
    exp.splice(i, 1);
    renderExperience(exp);
}

function collectExperience() {
    const cards = document.querySelectorAll('#experienceContainer .admin-card');
    return Array.from(cards).map(card => ({
        company: card.querySelector('.exp-company').value,
        role: card.querySelector('.exp-role').value,
        duration: card.querySelector('.exp-duration').value,
        description: card.querySelector('.exp-desc').value
    }));
}

// Skills
function renderSkills(skills) {
    const c = document.getElementById('skillsContainer');
    c.innerHTML = '';
    skills.forEach((g, i) => {
        c.innerHTML += `
        <div class="admin-card" data-skill-index="${i}">
            <button class="btn-remove" onclick="removeSkillGroup(${i})"><i class="fa-solid fa-trash"></i></button>
            <div class="row g-2 mb-2">
                <div class="col-md-6">
                    <label class="form-label">Category</label>
                    <input type="text" class="form-control skill-category" value="${g.category || ''}" />
                </div>
                <div class="col-md-6">
                    <label class="form-label">Icon (FontAwesome class)</label>
                    <input type="text" class="form-control skill-icon" value="${g.icon || ''}" />
                </div>
            </div>
            <label class="form-label">Skills (comma separated)</label>
            <input type="text" class="form-control skill-list" value="${(g.skills || []).join(', ')}" />
        </div>`;
    });
}

function addSkillGroup() {
    const skills = collectSkills();
    skills.push({ category: '', icon: 'fa-solid fa-star', skills: [] });
    renderSkills(skills);
}

function removeSkillGroup(i) {
    const skills = collectSkills();
    skills.splice(i, 1);
    renderSkills(skills);
}

function collectSkills() {
    const cards = document.querySelectorAll('#skillsContainer .admin-card');
    return Array.from(cards).map(card => ({
        category: card.querySelector('.skill-category').value,
        icon: card.querySelector('.skill-icon').value,
        skills: card.querySelector('.skill-list').value.split(',').map(s => s.trim()).filter(s => s)
    }));
}

// Projects
function renderProjects(projects) {
    const c = document.getElementById('projectsContainer');
    c.innerHTML = '';
    projects.forEach((p, i) => {
        c.innerHTML += `
        <div class="admin-card" data-project-index="${i}">
            <button class="btn-remove" onclick="removeProject(${i})"><i class="fa-solid fa-trash"></i></button>
            <div class="row g-2 mb-2">
                <div class="col-md-6">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control proj-title" value="${p.title || ''}" />
                </div>
                <div class="col-md-6">
                    <label class="form-label">Icon (FontAwesome class)</label>
                    <input type="text" class="form-control proj-icon" value="${p.icon || ''}" />
                </div>
            </div>
            <div class="mb-2">
                <label class="form-label">Description</label>
                <textarea class="form-control proj-desc" rows="3">${p.description || ''}</textarea>
            </div>
            <div class="row g-2 mb-2">
                <div class="col-md-4">
                    <label class="form-label">Badge</label>
                    <input type="text" class="form-control proj-badge" value="${p.badge || ''}" />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Badge Class</label>
                    <input type="text" class="form-control proj-badge-class" value="${p.badgeClass || ''}" placeholder="e.g. badge-work" />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-control proj-company" value="${p.company || ''}" />
                </div>
            </div>
            <div class="mb-2">
                <label class="form-label">Technologies (comma separated)</label>
                <input type="text" class="form-control proj-tech" value="${(p.technologies || []).join(', ')}" />
            </div>
            <div class="row g-2 mb-2">
                <div class="col-md-4">
                    <label class="form-label">Link URL</label>
                    <input type="text" class="form-control proj-link-url" value="${p.linkUrl || ''}" />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Link Text</label>
                    <input type="text" class="form-control proj-link-text" value="${p.linkText || ''}" />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Link Icon</label>
                    <input type="text" class="form-control proj-link-icon" value="${p.linkIcon || ''}" />
                </div>
            </div>
            <div class="form-check mt-2">
                <input type="checkbox" class="form-check-input proj-fullwidth" ${p.isFullWidth ? 'checked' : ''} />
                <label class="form-check-label form-label">Full Width Card</label>
            </div>
        </div>`;
    });
}

function addProject() {
    const projects = collectProjects();
    projects.push({ title: '', icon: 'fa-solid fa-folder', description: '', technologies: [] });
    renderProjects(projects);
}

function removeProject(i) {
    const projects = collectProjects();
    projects.splice(i, 1);
    renderProjects(projects);
}

function collectProjects() {
    const cards = document.querySelectorAll('#projectsContainer .admin-card');
    return Array.from(cards).map(card => ({
        title: card.querySelector('.proj-title').value,
        icon: card.querySelector('.proj-icon').value,
        description: card.querySelector('.proj-desc').value,
        badge: card.querySelector('.proj-badge').value || null,
        badgeClass: card.querySelector('.proj-badge-class').value || null,
        company: card.querySelector('.proj-company').value || null,
        technologies: card.querySelector('.proj-tech').value.split(',').map(s => s.trim()).filter(s => s),
        linkUrl: card.querySelector('.proj-link-url').value || null,
        linkText: card.querySelector('.proj-link-text').value || null,
        linkIcon: card.querySelector('.proj-link-icon').value || null,
        isFullWidth: card.querySelector('.proj-fullwidth').checked
    }));
}

// Save
async function saveAll() {
    const data = {
        profile: {
            name: document.getElementById('profileName').value,
            title: document.getElementById('profileTitle').value,
            aboutMe: document.getElementById('profileAbout').value,
            photoUrl: document.getElementById('profilePhoto').value
        },
        education: {
            degree: document.getElementById('eduDegree').value,
            college: document.getElementById('eduCollege').value,
            year: document.getElementById('eduYear').value
        },
        experience: collectExperience(),
        skills: collectSkills(),
        projects: collectProjects(),
        contact: {
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            location: document.getElementById('contactLocation').value,
            linkedInUrl: document.getElementById('contactLinkedIn').value,
            gitHubUrl: document.getElementById('contactGitHub').value
        }
    };

    try {
        const res = await fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            showToast('Saved successfully!');
        } else {
            showToast('Failed to save', true);
        }
    } catch {
        showToast('Error saving data', true);
    }
}

function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast-msg show' + (isError ? ' error' : '');
    setTimeout(() => t.className = 'toast-msg', 3000);
}

// Init
loadData();
