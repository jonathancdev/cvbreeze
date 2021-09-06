import React, { useState } from "react";
import CreateNavbar from "./CreateNavbar";
import { Route, Switch } from "react-router-dom";
import {
  Contact,
  Education,
  Photo,
  Profile,
  Skills,
  WorkExperience,
  CreateLayout,
} from "./create-index";
export default function Create(props) {
  const [layoutData, setLayoutData] = useState({});

  const updateLayoutData = (obj) => {
    setLayoutData(obj);
  };
  console.log(layoutData);
  return (
    <section className="create">
      <CreateNavbar />
      <Route exact path="/create">
        hello
      </Route>
      <CreateLayout layoutData={layoutData}>
        <Switch>
          <Route path="/create/photo">
            <Photo updateLayoutData={updateLayoutData} />
          </Route>
          <Route path="/create/profile">
            <Profile updateLayoutData={updateLayoutData} />
          </Route>
          <Route path="/create/work-experience">
            <WorkExperience updateLayoutData={updateLayoutData} />
          </Route>
          <Route path="/create/education">
            <Education updateLayoutData={updateLayoutData} />
          </Route>
          <Route path="/create/skills">
            <Skills updateLayoutData={updateLayoutData} />
          </Route>
          <Route path="/create/contact">
            <Contact updateLayoutData={updateLayoutData} />
          </Route>
          <Route exact path="/create/view">
            view
          </Route>
        </Switch>
      </CreateLayout>
    </section>
  );
}
