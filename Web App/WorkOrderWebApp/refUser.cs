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
    
    public partial class refUser
    {
        public refUser()
        {
            this.ManageDevices = new HashSet<ManageDevice>();
            this.WorkOrders = new HashSet<WorkOrder>();
            this.WorkOrders1 = new HashSet<WorkOrder>();
            this.ManageDevices1 = new HashSet<ManageDevice>();
        }
    
        public int ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public bool Enabled { get; set; }
        public string EmailAddress { get; set; }
        public Nullable<bool> Admin { get; set; }
        public Nullable<bool> WebUser { get; set; }
        public Nullable<bool> DeviceUser { get; set; }
    
        public virtual ICollection<ManageDevice> ManageDevices { get; set; }
        public virtual ICollection<WorkOrder> WorkOrders { get; set; }
        public virtual ICollection<WorkOrder> WorkOrders1 { get; set; }
        public virtual ICollection<ManageDevice> ManageDevices1 { get; set; }
    }
}
