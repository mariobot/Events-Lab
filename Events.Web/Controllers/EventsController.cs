using Events.Data;
using Events.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Events.Web.Extensions;


namespace Events.Web.Controllers
{
    public class EventsController : BaseController
    {
        // GET: Events
        public ActionResult Create()
        {
            return View(new EventInputModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(EventInputModel model)
        {
            if (model != null && ModelState.IsValid)
            {
                var e = new Event()
                {
                    AuthorId = this.User.Identity.GetUserId(),
                    Title = model.Title,
                    StartDateTime = model.StartDateTime,
                    Duration = TimeSpan.Parse(model.Duration.ToString()),
                    Description = model.Description,
                    Location = model.Location,
                    IsPublic = model.IsPublic
                };

                db.Events.Add(e);
                db.SaveChanges();
                this.AddNotification("Event created", NotificationType.INFO);
                return RedirectToAction("My");
            }

            return View(model);
        }

        public ActionResult My()
        {
            return View();
        }
    }
}