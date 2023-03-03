import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [selected, setSelected] = useState([]);
  const [operation, setOperation] = useState("");
  const [arrayNumbers, setArrayNumbers] = useState([]);
  const [memory, setMemory] = useState();
  const [finish, setFinish] = useState(false);

  const prepareArray = () => {
    const numbers = [...Array(10).keys()];
    const reverse = numbers.reverse();
    setArrayNumbers(reverse);
  };

  const reset = () => {
    setResult(0);
    setSelected([]);
    setOperation("");
  };

  const addSelected = (item) => {
    // arreglar que cuando cambie de signo no agregue otro numero
    setSelected([...selected, result]);
    setOperation(item);
    setMemory(result);
    setResult(0);
  };

  const showResult = () => {
    let copy = [...selected];
    // lo tuve que hacer con push porque con spread era asincronico y me mostraba el resultado en el siguiente click
    copy.push(result);
    const numberConv = copy.map(Number);
    console.log(numberConv);
    switch (operation) {
      case "+":
        const sum = numberConv[0] + numberConv[1];
        setOperation("=");
        setMemory(sum);
        setFinish(true);
        return setResult(sum);
      case "-":
        const rest = numberConv[0] - numberConv[1];
        setOperation("=");
        setMemory(rest);
        return setResult(rest);
      case "X":
        const mult = numberConv[0] * numberConv[1];
        setOperation("=");
        setMemory(mult);
        return setResult(mult);
      case "/":
        const div = numberConv[0] / numberConv[1];
        setOperation("=");
        setMemory(div);
        return setResult(div);
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  };

  useEffect(() => {
    prepareArray();
  }, []);

  // No me funciona para que pueda seguir haciendo cuentas despues (quiero sobreescribir el resultado)
  const checkReset = (e) => {
    if (finish) {
      setResult(0);
      console.log(finish, result);
      setResult(parseInt(result + e.target.value));
    } else {
      setResult(parseInt(result + e.target.value));
    }
  };

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      mt={1}
      xs={12}
      md={12}
      lg={12}
      spacing={4}
      className="mainBox"
    >
      <Grid
        mt={2}
        className="calcu"
        container
        spacing={{ xs: 3, md: 2 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
        sx={{ border: 1 }}
      >
        <Grid
          className="topCalcu"
          p={2}
          mb={2}
          sx={{ border: 1 }}
          fontSize="2rem"
          xs={12}
        >
          <Grid className="result" item xs={10}>
            {result}
          </Grid>
          <Grid fontSize="1rem" className="result" item xs={2}>
            {operation}
            {memory}
          </Grid>
        </Grid>
        <Grid xs={3}>
          <Button
            onClick={() => addSelected("+")}
            variant="contained"
            size="large"
          >
            +
          </Button>
        </Grid>
        <Grid xs={3}>
          <Button
            onClick={() => addSelected("-")}
            variant="contained"
            size="large"
          >
            -
          </Button>
        </Grid>
        <Grid xs={3}>
          <Button
            onClick={() => addSelected("X")}
            variant="contained"
            size="large"
          >
            X
          </Button>
        </Grid>
        <Grid xs={3}>
          <Button
            onClick={() => addSelected("/")}
            variant="contained"
            size="large"
          >
            /
          </Button>
        </Grid>
        <Grid className="numberBox" md={9}>
          {arrayNumbers.map((id) => (
            <Grid className="numberClass" xs={3} sm={3} md={4} key={id}>
              <Button
                variant="outlined"
                value={id}
                // Esto no funciona
                onKeyPress={(e) => setResult(parseInt(result + e.target.value))}
                onClick={(e) => checkReset(e)}
                size="large"
                className="btnN"
              >
                {id}
              </Button>
            </Grid>
          ))}
          <Grid className="numberClass" xs={4}>
            <Button
              // No funciona
              onClick={() => setResult([...(result + ".")])}
              variant="outlined"
              size="large"
            >
              .
            </Button>
          </Grid>
          <Grid className="numberClass" xs={4}>
            <Button
              onClick={() => reset()}
              className="numberClass"
              variant="outlined"
              size="large"
            >
              C
            </Button>
          </Grid>
        </Grid>

        <Grid xs={3}>
          <Button
            onClick={() => showResult()}
            className="numberClass"
            variant="contained"
            size="large"
            color="error"
            sx={{ height: "100%" }}
          >
            =
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calculator;
