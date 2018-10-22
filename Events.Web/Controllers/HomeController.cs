using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Events.Data;
using Events.Web.Models;

namespace Events.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            var events = db.Events;

            var upcomingEvents = db.Events.Where(x => x.StartDateTime > DateTime.Now).ToList();
            var passedEvents = db.Events.Where(x => x.StartDateTime <= DateTime.Now).ToList();

            return View(new UpcomingPassedEventsViewModel() {
                UpcomingEvents = upcomingEvents,
                PassedEvents = passedEvents
            });
        }

        public ActionResult EventsDetailsById(int id)
        {
            Event eventDetails = db.Events.Where(x => x.Id == id).First();

            return PartialView("_EventDetails", eventDetails);
        }
    }
}