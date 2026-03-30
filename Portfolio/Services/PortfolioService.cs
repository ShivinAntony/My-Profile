using System.Text.Json;
using Portfolio.Models;

namespace Portfolio.Services;

public class PortfolioService
{
    private readonly string _dataPath;
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    public PortfolioService(IWebHostEnvironment env)
    {
        _dataPath = Path.Combine(env.ContentRootPath, "App_Data", "portfolio.json");
    }

    public PortfolioData GetPortfolioData()
    {
        if (File.Exists(_dataPath))
        {
            var json = File.ReadAllText(_dataPath);
            return JsonSerializer.Deserialize<PortfolioData>(json, JsonOptions) ?? GetDefaultData();
        }
        return GetDefaultData();
    }

    public void SavePortfolioData(PortfolioData data)
    {
        var dir = Path.GetDirectoryName(_dataPath)!;
        if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
        var json = JsonSerializer.Serialize(data, JsonOptions);
        File.WriteAllText(_dataPath, json);
    }

    private static PortfolioData GetDefaultData()
    {
        return new PortfolioData
        {
            Profile = new ProfileInfo
            {
                Name = "Shivin Antony",
                Title = ".NET Developer",
                AboutMe = "Passionate .NET Developer with experience building robust web applications using ASP.NET Core, C#, and modern web technologies.",
                PhotoUrl = "/images/profile.jpg"
            },
            Education = new Education
            {
                Degree = "BSc Computer Science",
                College = "Don Bosco College, Ollukara",
                Year = "2018 - 2021"
            },
            Experience = new List<WorkExperience>
            {
                new()
                {
                    Company = "MACOM Solutions (Manappuram Comptech and Consultants Ltd)",
                    Role = ".NET Developer",
                    Duration = "Jul 2024 – Present",
                    Description = "Worked as a .NET Developer contributing to the design, development, and maintenance of web-based applications using ASP.NET and C#. Collaborated with cross-functional teams to implement business requirements, optimize application performance, fix bugs, and support existing systems. Assisted in database development using SQL Server and followed coding standards and best practices to ensure reliable and scalable solutions."
                }
            },
            Skills = new List<SkillGroup>
            {
                new() { Category = "Backend", Icon = "fa-solid fa-server", Skills = new() { "C#", ".NET Core", "SQL", "PL/SQL", "Java", "REST API", "Web API", "MVC Architecture" } },
                new() { Category = "Frontend", Icon = "fa-solid fa-palette", Skills = new() { "HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap" } },
                new() { Category = "Databases", Icon = "fa-solid fa-database", Skills = new() { "MySQL", "Oracle", "SQL Server" } },
                new() { Category = "Frameworks", Icon = "fa-solid fa-layer-group", Skills = new() { "ASP.NET Core", "Entity Framework Core" } },
                new() { Category = "Tools", Icon = "fa-solid fa-wrench", Skills = new() { "Git", "GitLab", "VS Code", "Postman" } }
            },
            Projects = new List<Project>
            {
                new()
                {
                    Title = "JUSSUIT - Litigation Management Solution",
                    Icon = "fa-solid fa-gavel",
                    Badge = "Currently Working",
                    BadgeClass = "badge-work",
                    Company = "MACOM",
                    Description = "Jus Suit is a full-featured solution to manage the entire litigation process of a company. It helps internal Legal Departments identify actionable loan accounts based on management policy and supports the department to proficiently manage constant litigations.",
                    Technologies = new() { "C#", ".NET Core", "ASP.NET Core", "REST API", "MVC", "PL/SQL", "SQL Server", "Entity Framework Core" },
                    LinkUrl = "https://gen.mactech.net.in/JusSuit_Asirvad/ASIRVAD/login",
                    LinkText = "Live Demo",
                    LinkIcon = "fa-solid fa-arrow-up-right-from-square",
                    IsFullWidth = true
                },
                new()
                {
                    Title = "Palliative Care App & Web",
                    Icon = "fa-solid fa-heart-pulse",
                    Badge = "College Project",
                    Description = "A web and mobile application to manage palliative care operations including patient allocation, medical reports, campaign details, sponsor approval, and trainee management. The goal is to improve quality of life for both the patient and the family.",
                    Technologies = new() { "PHP", "Android Studio", "SQLyog" }
                },
                new()
                {
                    Title = "Shopping Cart",
                    Icon = "fa-solid fa-cart-shopping",
                    Description = "A shopping cart web app that facilitates effortless online shopping. Users can browse products, add items to their cart, and securely complete transactions. Efficiently manages product catalog, user accounts, and order processing.",
                    Technologies = new() { "JavaScript", "Node.js", "Express.js", "MongoDB", "Bootstrap", "HTML", "CSS" },
                    LinkUrl = "https://github.com/ShivinAntony/shopping-cart-node1",
                    LinkText = "View on GitHub",
                    LinkIcon = "fa-brands fa-github"
                }
            },
            Contact = new ContactInfo
            {
                Email = "shivinantony087@gmail.com",
                Phone = "80781 08280",
                Location = "Thrissur, Kerala, India",
                LinkedInUrl = "https://www.linkedin.com/in/shivin-antony-b1618921-9/",
                GitHubUrl = "https://github.com/ShivinAntony"
            }
        };
    }
}
