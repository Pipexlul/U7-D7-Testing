import original from "./cafes.json" assert { type: "json" };

let cafes = structuredClone(original);
let latestId = cafes.sort((a, b) => b.id - a.id)[0].id;

const resetDatabase = (req, res, next) => {
  cafes = structuredClone(original);
};

const getCafe = (id) => {
  const cafe = cafes.find((c) => c.id === id);

  if (!cafe) {
    return null;
  }

  return cafe;
};

const getCafes = () => {
  return cafes.sort((a, b) => a.id - b.id);
};

const addCafe = (name) => {
  const lcName = name.toLowerCase();
  const existingCafe = cafes.find((c) => c.nombre.toLowerCase() === lcName);

  if (existingCafe) {
    return null;
  } else {
    const newCafe = {
      id: ++latestId,
      nombre: name,
    };

    cafes.push(newCafe);

    return newCafe;
  }
};

const modifyCafe = ({ id, name }) => {
  const response = {
    valid: true,
    reason: {
      notFound: false,
      existingName: false,
    },
    modifiedObj: null,
  };

  const existingCafe = cafes.find((c) => c.id === id);

  if (!existingCafe) {
    response.valid = false;
    response.reason.notFound = true;
    return response;
  }

  const lcName = name.toLowerCase();
  const existingName = cafes.find((c) => c.nombre.toLowerCase() === lcName);

  if (existingName) {
    response.valid = false;
    response.reason.existingName = true;
    return response;
  }

  existingCafe.nombre = name;
  response.modifiedObj = existingCafe;

  return response;
};

const deleteCafe = (id) => {
  const existingCafe = cafes.findIndex((c) => c.id === id);

  if (existingCafe === -1) {
    return false;
  }

  cafes.splice(existingCafe, 1);
  return true;
};

export default {
  getCafe,
  getCafes,
  addCafe,
  modifyCafe,
  deleteCafe,
  resetDatabase,
};
