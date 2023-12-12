import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The VendorOrderCollection. It encapsulates state and variable values for stuff.
 */
class ApproveVendorOrderCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ApproveVendorOrderCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      event: String,
      location: String,
      containers: Number,
      size: String,
      createdAt: Date,
      scheduledFor: Date,
      approval: {
        type: Number,
        allowedValues: [1, 2, 3],
        defaultValue: 1,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VendorOrderCollection.
 * @type {ApproveVendorOrderCollection}
 */
export const ApproveOrders = new ApproveVendorOrderCollection();
