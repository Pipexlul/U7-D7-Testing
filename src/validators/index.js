import cafeId from "./cafes/id.js";
import cafeName from "./cafes/name.js";

const cafes = {
  paramId: cafeId.validateParamId,
  bodyId: cafeId.validateBodyId,
  bodyName: cafeName.validateBodyName,
};

export { cafes };
