import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ContainersCollection. It encapsulates state and variable values for stuff.
 */
class ContainersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ContainersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      codeQR: String,
      size: {
        type: String,
        allowedValues: ['small', 'medium', 'large'],
        defaultValue: 'medium',
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ContainersCollection.
 * @type {ContainersCollection}
 */
export const Containers = new ContainersCollection();
