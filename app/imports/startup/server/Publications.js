import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Containers } from '../../api/container/Containers';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import { Vendors } from '../../api/vendor/Vendors';
import { ApproveOrders } from '../../api/vendor/ApproveVendorOrder';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Containers.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const user = Meteor.users.findOne(this.userId);
    const email = user?.emails?.[0]?.address; // Access the first email address
    if (email) {
      return Containers.collection.find({ owner: email });
    }
  }
  return this.ready();
});

Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(VendorOrder.vendorPublicationName, function () {
  if (this.userId) {
    const email = Meteor.users.findOne(this.userId).username;
    return VendorOrder.collection.find({ email: email });
  }
  return this.ready();
  // if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
  //   const vendorUser = Meteor.users.findOne(this.userId).email;
  //   return Vendors.collection.find({ email: vendorUser });
  //   const email = vendorUser?.emails?.[0]?.address; // Access the first email address
  //   if (email) {
  //     return VendorOrder.collection.find({ email: email });
  //   }
  // }
  // return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Containers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Containers.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(VendorOrder.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return VendorOrder.collection.find();
  }
  return this.ready();
});

Meteor.publish(ApproveOrders.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ApproveOrders.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
