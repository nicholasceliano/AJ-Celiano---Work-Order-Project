//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WorkOrderWebApp
{
    using System;
    using System.Collections.Generic;
    
    public partial class refDevice
    {
        public refDevice()
        {
            this.ManageDevices = new HashSet<ManageDevice>();
        }
    
        public int ID { get; set; }
        public string DeviceName { get; set; }
        public bool Enabled { get; set; }
    
        public virtual ICollection<ManageDevice> ManageDevices { get; set; }
    }
}
