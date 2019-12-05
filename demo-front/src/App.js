import React from "react";
import { Main, Box, Tag, textStyle } from "@aragon/ui";
import "styled-components/macro";
import XTerm from "./XTerm";
class App extends React.Component {
  render() {
    return (
      <Main>
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box>
            <div
              css={`
                ${textStyle("title3")}
              `}
            >
              Terminal
            </div>
            <Tag mode="new">Demo</Tag>
            <XTerm />
          </Box>
        </div>
      </Main>
    );
  }
}

export default App;
