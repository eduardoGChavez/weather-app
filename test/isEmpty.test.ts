import { isEmpty } from "../src/utils/validations";

describe("Test of isEmpty", () => {
  it("should return false because the data is not empty", () => {
    const datoString = "dato no vacio";
    const response = isEmpty(datoString);

    // retorna falso porque el dato no esta vacio.
    expect(response).toEqual(false);
  });

  it("should return false because the data is not empty", () => {
    const datoNumeroIsEmpty = 777873283232432432;
    const response = isEmpty(datoNumeroIsEmpty);

    // retorna falso porque el dato no esta vacio.
    expect(response).toEqual(false);
  });

  it("should return false because the object is not empty", () => {
    const datoObjetoIsEmpty = {
      dato: "es un test",
      date: new Date(),
    };
    const response = isEmpty(datoObjetoIsEmpty);

    // retorna falso porque el objeto no esta vacío.
    expect(response).toEqual(false);
  });

  it("should return true because the data is null", () => {
    const datoNuloIsEmpty = null;
    const response = isEmpty(datoNuloIsEmpty);

    // retorna true porque el dato es undefined.
    expect(response).toEqual(true);
  });
  it("should return true because the data is undefined", () => {
    const datoUndefined = undefined;
    const response = isEmpty(datoUndefined);

    // retorna true porque el dato es undefined.
    expect(response).toEqual(true);
  });

  it("should return false because the data contains a boolean type", () => {
    const datoBooleanIsEmpty = true;
    const response = isEmpty(datoBooleanIsEmpty);

    // retorna false porque el dato es de tipo boolean.
    expect(response).toEqual(false);
  });

  it("should return false because the array is not empty", () => {
    const datoArregloIsEmpty = ["a", "b", "c"];
    const response = isEmpty(datoArregloIsEmpty);

    // retorna false porque el array si contiene elementos.
    expect(response).toEqual(false);
  });
});