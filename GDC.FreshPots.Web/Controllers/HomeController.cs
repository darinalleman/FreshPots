using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GDC.FreshPots.Web.Controllers
{
    public class HomeController : Controller
    {
        //Home Controller is an MVC Controller
        //to return the Index.cshtml view.
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }
    }
}
