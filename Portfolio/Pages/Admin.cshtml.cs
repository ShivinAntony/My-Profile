using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Portfolio.Pages;

public class AdminModel : PageModel
{
    private const string AdminUserId = "111111";
    private const string AdminPassword = "Shivin@7";

    public bool IsLoggedIn => HttpContext.Session.GetString("AdminLoggedIn") == "true";

    [BindProperty]
    public string? UserId { get; set; }

    [BindProperty]
    public string? Password { get; set; }

    public string? ErrorMessage { get; set; }

    public void OnGet() { }

    public IActionResult OnPostLogin()
    {
        if (UserId == AdminUserId && Password == AdminPassword)
        {
            HttpContext.Session.SetString("AdminLoggedIn", "true");
            return RedirectToPage();
        }

        ErrorMessage = "Invalid User ID or Password.";
        return Page();
    }

    public IActionResult OnPostLogout()
    {
        HttpContext.Session.Clear();
        return RedirectToPage();
    }
}
