import { Grid } from "@mui/material";
import PageScroll, { ScrollPoint } from "./components/PageScroll";
import SectionBox from "./components/SectionBox";

function App() {
  return (
    <PageScroll>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <SectionBox idx={0} />
        </Grid>
        {[1, 2, 3, 4].map((i) => (
          <Grid item key={`item-${i}`}>
            <ScrollPoint id={`scroll-${i}`} />
            <SectionBox idx={i} />
          </Grid>
        ))}
      </Grid>
    </PageScroll>
  );
}

export default App;
