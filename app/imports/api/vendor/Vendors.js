import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Vendors. It encapsulates state and variable values for stuff.
 */
class Vendors {
  constructor() {
    // The name of this collection.
    this.name = 'Vendors';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      vendorName: String,
      firstName: String,
      lastName: String,
      email: String,
      password: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the Vendors.
 * @type {Vendors}
 */
export const VendorCollection = new Vendors();
