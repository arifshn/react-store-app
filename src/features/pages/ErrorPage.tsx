import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { errorsApi } from "../../errors/api/errorsApi";

export default function ErrorPage() {
  const [validationErrors, setValidationError] = useState<string[]>([]);

  function getValidationErrors() {
    errorsApi
      .getValidationError()
      .then(() => console.log("no validation"))
      .catch((errors) => setValidationError(errors));
  }
  return (
    <Container>
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error, index) => (
              <ListItem key={index}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          errorsApi.get400Error().catch((error) => console.log(error))
        }
      >
        400 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          errorsApi.get401Error().catch((error) => console.log(error))
        }
      >
        401 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          errorsApi.get404Error().catch((error) => console.log(error))
        }
      >
        404 Error
      </Button>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        onClick={() =>
          errorsApi.get500Error().catch((error) => console.log(error))
        }
      >
        500 Error
      </Button>
      <Button sx={{ mr: 2 }} variant="contained" onClick={getValidationErrors}>
        Validation Error
      </Button>
    </Container>
  );
}
