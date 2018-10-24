using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Events.Web.Models
{
    public class EventInputModel
    {
        public EventInputModel()
        {
            this.IsPublic = true;
            this.StartDateTime = DateTime.Now;            
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Event title is required")]
        [StringLength(200, ErrorMessage = "Error", MinimumLength = 1)]
        [Display(Name = "Title *")]
        public string Title { get; set; }

        [DataType(DataType.Date)]
        [Required]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime StartDateTime { get; set; }
        
        [DataType(DataType.Duration)]
        public TimeSpan? Duration { get; set; }        

        public string Description { get; set; }

        [MaxLength(200)]
        public string Location { get; set; }

        [Display(Name = "Is Public ?")]
        public bool IsPublic { get; set; }
    }
}