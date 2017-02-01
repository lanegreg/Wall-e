
App [_CONTAINER_] (#2)
  Header [_CONTAINER_] (#2)
    ProgressBar [_component_] (#3)
  Content [_CONTAINER_] (#4)
    PageWrap [_component_] (#3)
    TextInput [_component_] (#3)
    SelectOption [_component_] (#3)
    SelectButton [_component_] (#3)
    ProgressButton [_component_] (#3)
  Footer [_CONTAINER_] (#5)
    Link [_component_] (#3)


- #1 Initializes the store and default app state.
- #2 Displays the header and passes down props to the progress-bar component.
- #3 A dumb component whose display is managed by props passed to it.
- #4 Manages the lead form state, events, and transitions.
- #5 Displays the footer and passes down props to each footer-link component.
