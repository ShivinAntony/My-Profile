using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;
using Portfolio.Services;

namespace Portfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly PortfolioService _service;

    public PortfolioController(PortfolioService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<PortfolioData> Get()
    {
        return Ok(_service.GetPortfolioData());
    }

    [HttpPost]
    public IActionResult Save([FromBody] PortfolioData data)
    {
        _service.SavePortfolioData(data);
        return Ok(new { message = "Saved successfully" });
    }
}
