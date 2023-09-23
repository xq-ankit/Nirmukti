import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";
import { CredentialResponse } from "../../interfaces/google";

const queryClient = new QueryClient();

const GettingStarted = () => {
  const queryClient = useQueryClient();
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = () => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2E1A47",
      }}
    >
      <Box sx={{ backgroundColor: "#2E1A47" }}>
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />

        <GoogleButton />

        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          {/* <img
            alt="Nirmukti logo"
            src={} //logo
          />
          Nirmukti */}
        </Typography>
      </Box>
    </Container>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GettingStarted />
    </QueryClientProvider>
  );
};

export default App;
