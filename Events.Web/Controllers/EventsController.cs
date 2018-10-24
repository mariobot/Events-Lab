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
    [Authorize]
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
            string currenUserId = this.User.Identity.GetUserId();
            var events = db.Events.Where(x => x.AuthorId == currenUserId);

            var upcomingEvents = events.Where(e => e.StartDateTime > DateTime.Now).ToList();
            var passedEvents = events.Where(e => e.StartDateTime <= DateTime.Now).ToList();

            return View(new UpcomingPassedEventsViewModel() {
                UpcomingEvents = upcomingEvents,
                PassedEvents = passedEvents
            });
        }

        public ActionResult Edit(int id) {
            var _event = db.Events.Find(id);

            if (_event != null)
            {
                var model = new EventInputModel()
                {
                    Id = _event.Id,
                    Description = _event.Description,
                    IsPublic = _event.IsPublic,
                    Duration = _event.Duration,
                    Location = _event.Location,
                    StartDateTime = _event.StartDateTime,
                    Title = _event.Title
                };
                return View(model);
            }
            else {
                this.AddNotification("Cannot edit event", NotificationType.ERROR);
                return RedirectToAction("My");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(EventInputModel model)
        {
            var _event = db.Events.Find(model.Id);

            if (_event == null)
            {
                this.AddNotification("Canot edit event", NotificationType.ERROR);
                return RedirectToAction("My");
            }
            if (model != null && ModelState.IsValid)
            {
                _event.Title = model.Title;
                _event.StartDateTime = model.StartDateTime;
                _event.Duration = model.Duration;
                _event.Description = model.Description;
                _event.Location = model.Location;
                _event.IsPublic = model.IsPublic;

                db.SaveChanges();
                this.AddNotification("Event edited", NotificationType.INFO);
                return RedirectToAction("My");
            }
            return View(model);
        }
    }
}