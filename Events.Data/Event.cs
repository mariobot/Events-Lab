using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Data
{
    public class Event
    {
        public Event() {
            this.IsPublic = true;
            this.StartDateTime = DateTime.Now;
            this.Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Event title is required")]
        [StringLength(200,ErrorMessage ="",MinimumLength =1)]
        [Display(Name ="Title *")]
        public string Title { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime StartDateTime { get; set; }

        public TimeSpan? Duration { get; set; }

        public string AuthorId { get; set; }

        public virtual ApplicationUser Author { get; set; }

        public string Description { get; set; }

        [MaxLength(200)]
        public string Location { get; set; }

        [Display(Name = "Is Public ?")]
        public bool IsPublic { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
