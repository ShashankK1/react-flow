import { FlowNode } from "./FlowNode";

export class NodeBuilder {
  constructor() {
    this.node = {
      data: {},
    };
  }

  setId(id) {
    this.node.id = id;
    return this;
  }

  setPosition(x = 0, y = 0) {
    this.node.position = { x, y };
    return this;
  }

  setType(type = "default") {
    this.node.type = type;
    return this;
  }

  setLabel(label = "") {
    this.node.data.label = label;
    return this;
  }

  setDescription(description = "") {
    this.node.data.description = description;
    return this;
  }

  setDisplayId(displayId) {
    this.node.data.displayId = displayId;
    return this;
  }

  setOnDelete(onDelete) {
    this.node.data.onDelete = onDelete;
    return this;
  }

  setIsStart(isStart = false) {
    this.node.data.isStart = isStart;
    return this;
  }

  generateId() {
    return crypto.randomUUID();
  }

  build() {
    if (!this.node.id) {
      this.node.id = this.generateId();
    }

    if (!this.node.position) {
      this.node.position = { x: 0, y: 0 };
    }

    this.node.data = {
      label: "",
      description: "",
      displayId: this.node.id,
      isStart: false,
      ...this.node.data,
    };

    return new FlowNode(this.node);
  }
}
