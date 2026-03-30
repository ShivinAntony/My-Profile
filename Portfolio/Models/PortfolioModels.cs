namespace Portfolio.Models;

public class ProfileInfo
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string AboutMe { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
}

public class Education
{
    public string Degree { get; set; } = string.Empty;
    public string College { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
}

public class WorkExperience
{
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class SkillGroup
{
    public string Category { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public List<string> Skills { get; set; } = new();
}

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Badge { get; set; }
    public string? BadgeClass { get; set; }
    public string? Company { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string? LinkUrl { get; set; }
    public string? LinkText { get; set; }
    public string? LinkIcon { get; set; }
    public bool IsFullWidth { get; set; }
}

public class ContactInfo
{
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string LinkedInUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
}

public class PortfolioData
{
    public ProfileInfo Profile { get; set; } = new();
    public Education Education { get; set; } = new();
    public List<WorkExperience> Experience { get; set; } = new();
    public List<SkillGroup> Skills { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public ContactInfo Contact { get; set; } = new();
}
