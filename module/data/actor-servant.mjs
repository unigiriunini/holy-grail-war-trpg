import HolyGrailWarTRPGActorBase from "./base-actor.mjs";

export default class HolyGrailWarTRPGServant extends HolyGrailWarTRPGActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.true_name = new fields.StringField({ required: true, blank: true });
    schema.wish = new fields.StringField({ required: true, blank: true });

    return schema;
  }

}
