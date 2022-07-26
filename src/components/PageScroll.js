import React, { useEffect, useRef, useReducer } from "react";
import _ from "lodash";
import { Box, Fab, Fade } from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import DownIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
};

export const SCROLL_POINTS = {
  START: "scroll-start",
  END: "scroll-end",
};

export const ScrollPoint = ({ id }) => (
  <div
    id={id}
    className="scroll-point"
    style={{ height: 2, backgroundColor: "red" }}
  />
);

const reducer = (state, action) => {
  switch (action.type) {
    case SCROLL_POINTS.START:
      return { ...state, [SCROLL_POINTS.START]: action.payload };
    case SCROLL_POINTS.END:
      return { ...state, [SCROLL_POINTS.END]: action.payload };
    default:
      return state;
  }
};

const PageScroll = ({ children }) => {
  const points = useRef([]);
  const [buttonsState, dispatchButtonsState] = useReducer(reducer, {});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const pointId = entry.target.id;
        const pointIdx = _.findIndex(points.current, { id: pointId });
        const isIntersecting = entry.isIntersecting;

        points.current[pointIdx].visible = isIntersecting;
        dispatchButtonsState({ type: pointId, payload: !isIntersecting });
      });
    });

    let pointElements = document.querySelectorAll(".scroll-point");
    const _points = [];

    pointElements.forEach((el) => {
      observer.observe(el);
      _points.push({ id: el.getAttribute("id"), visible: null });
    });
    points.current = _points;

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = (direction) => {
    const _points = _.clone(points.current);
    if (direction === DIRECTIONS.DOWN) {
      const firstVisiblePoint = _.find(_points, (item) => item.visible);
      if (
        firstVisiblePoint.id !== _.last(_points).id &&
        !_.last(_points).visible
      ) {
        const nextPointIdx =
          _.findIndex(_points, (item) => item.id === firstVisiblePoint.id) + 1;
        const nextPointEl = document.getElementById(_points[nextPointIdx]?.id);
        if (nextPointEl)
          nextPointEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const firstVisiblePoint = _.find(_points, (item) => item.visible);
      const previousPointIdx = firstVisiblePoint
        ? _.findIndex(_points, (item) => item.id === firstVisiblePoint.id) - 1
        : 0;
      const previousPointEl = document.getElementById(
        _points[previousPointIdx]?.id
      );
      if (previousPointEl)
        previousPointEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box height="auto">
      <Fade in={buttonsState[SCROLL_POINTS.START]}>
        <Fab
          sx={{ position: "fixed", top: 30, right: 30 }}
          color="primary"
          onClick={() => handleScroll(DIRECTIONS.UP)}
        >
          <UpIcon />
        </Fab>
      </Fade>
      <Fade in={buttonsState[SCROLL_POINTS.END]}>
        <Fab
          sx={{ position: "fixed", right: 30, bottom: 30 }}
          color="primary"
          onClick={() => handleScroll(DIRECTIONS.DOWN)}
        >
          <DownIcon />
        </Fab>
      </Fade>
      <ScrollPoint id={SCROLL_POINTS.START} />
      {children}
      <ScrollPoint id={SCROLL_POINTS.END} />
    </Box>
  );
};

export default PageScroll;
