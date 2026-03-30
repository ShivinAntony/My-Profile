using Microsoft.AspNetCore.Mvc.RazorPages;
using Portfolio.Models;
using Portfolio.Services;

namespace Portfolio.Pages;

public class IndexModel : PageModel
{
    private readonly PortfolioService _portfolioService;

    public PortfolioData Data { get; set; } = new();

    public IndexModel(PortfolioService portfolioService)
    {
        _portfolioService = portfolioService;
    }

    public void OnGet()
    {
        Data = _portfolioService.GetPortfolioData();
    }
}
