using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Events.Data;

namespace Events.Web.Models
{
    public class UpcomingPassedEventsViewModel
    {
        public IEnumerable<Event> UpcomingEvents { set; get; }

        public IEnumerable<Event> PassedEvents { set; get; }
    }
}