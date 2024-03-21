import { size } from "../src/utils/validations";

describe("Test of size", () => {
  it("should return length of 29", () => {
    const datoStringSize = "esto debe tener una longitud!";
    const response = size(datoStringSize);

    // retorna longitud de 29.
    expect(response).toEqual(29);
  });
  
  it("should return length of 5", () => {
    const datoNumeroSize = 12345;
    const response = size(datoNumeroSize);

    // retorna longitud de 5.
    expect(response).toEqual(5);
  });

  it("should return length of 3", () => {
    const datoObjetoSize = {
        data: "ejemplo",
        id: new Date(),
        name: "alex",
    };
    const response = size(datoObjetoSize);

    // retorna longitud de 3 (este es el numero de keys que contiene el objeto).
    expect(response).toEqual(3);
  });

  it("should return length of 0", () => {
    const datoNuloSize = null;
    const response = size(datoNuloSize);

    // retorna longitud de 0 porque el dato es nulo.
    expect(response).toEqual(0);
  });

  it("should return length of 0", () => {
    const datoUndefinedSize = undefined;
    const response = size(datoUndefinedSize);

    // retorna longitud de 0 porque el dato es undefined.
    expect(response).toEqual(0);
  });

  it("should return length of 6", () => {
    const datoArregloSize = [1, 21, "alex", true, {}, undefined];
    const response = size(datoArregloSize);

    // retorna longitud de 6 porque es el número de elementos que contiene el arreglo.
    expect(response).toEqual(6);
  });
});


