import SimpleSchema from 'simpl-schema';

const VendorOrderSchema = new SimpleSchema({
  firstName: { label: 'First Name', type: String, defaultValue: '' },
  lastName: { label: 'Last Name', type: String, defaultValue: '' },
  email: { label: 'Email', type: String, defaultValue: '' },
  event: { label: 'Type of Event', type: String, defaultValue: '' },
  location: { label: 'Location', type: String, defaultValue: '' },
  containers: {
    label: 'Number of Containers', type: Number },
  size: { label: 'Location', type: String, defaultValue: '' },
});

export { VendorOrderSchema };
