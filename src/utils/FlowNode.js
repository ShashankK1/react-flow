export class FlowNode {
  constructor({ id, position, data, type }) {
    this.id = id;
    this.position = position;
    this.data = data;
    this.type = type || "default";
  }
}
