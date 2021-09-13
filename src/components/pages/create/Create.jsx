import React, { useState, useEffect, useCallback } from "react";
import CreateNavbar from "./CreateNavbar";
import checkCompletedSections from "../../../utilities/checkCompletedSections";
import { Route, Switch } from "react-router-dom";
import {
  Contact,
  Education,
  Photo,
  Profile,
  Skills,
  WorkExperience,
  View,
  CreateLayout,
} from "./create-index";
export default function Create({ user }) {
  const [allSectionsCompleted, setAllSectionsCompleted] = useState(false);
  const [layoutData, setLayoutData] = useState({});
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    setCompletedSections(checkCompletedSections());
  }, [checkCompletedSections]);

  const updateCompletedSection = (obj) => {
    //saveSection in each section checks all section storage meets reqs and
    //passes obj back to update state here
    setCompletedSections({ ...obj });
  };
  const updateLayoutData = useCallback(
    (obj) => {
      setLayoutData(obj);
    },
    [setLayoutData]
  );
  console.log(completedSections);
  //may not need to pass function to update completed because now
  return (
    <section className="create">
      <CreateNavbar completedSections={completedSections} />
      <Route exact path="/create">
        create default page text
      </Route>
      <CreateLayout layoutData={layoutData} user={user}>
        <Switch>
          <Route path="/create/photo">
            <Photo
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route path="/create/profile">
            <Profile
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route path="/create/work-experience">
            <WorkExperience
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route path="/create/education">
            <Education
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route path="/create/skills">
            <Skills
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route path="/create/contact">
            <Contact
              updateLayoutData={updateLayoutData}
              updateCompletedSection={updateCompletedSection}
              user={user}
            />
          </Route>
          <Route exact path="/create/view">
            <View user={user} />
          </Route>
        </Switch>
      </CreateLayout>
    </section>
  );
}
