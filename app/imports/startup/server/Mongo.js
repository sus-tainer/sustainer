import { Meteor } from 'meteor/meteor';
import { Containers } from '../../api/container/Containers.js';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import { Vendors } from '../../api/vendor/Vendors';

// Initialize the database with a default data document.
const addContainer = (data) => {
  console.log(`  Adding: ${data.owner} (${data.size})`);
  Containers.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Containers.collection.find().count() === 0) {
  if (Meteor.settings.defaultContainer) {
    console.log('Creating default containers.');
    Meteor.settings.defaultContainer.forEach(data => addContainer(data));
  }
}

const addVendorOrder = (data) => {
  console.log(`  Adding: ${data.firstName} (${data.email})`);
  VendorOrder.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (VendorOrder.collection.find().count() === 0) {
  if (Meteor.settings.defaultOrders) {
    console.log('Creating default Vendor Orders.');
    Meteor.settings.defaultOrders.forEach(data => addVendorOrder(data));
  }
}

const addVendor = (data) => {
  console.log(`  Adding: ${data.vendorName} (${data.email})`);
  Vendors.collection.insert(data);
};

// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendor.');
    Meteor.settings.defaultVendors.forEach(data => addVendor(data));
  }
}
