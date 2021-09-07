import React, { useState, useEffect, useCallback } from "react";
import CreateNavbar from "./CreateNavbar";
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

  // useEffect(() => {
  //   const completed = checkCompletedSections()
  //   setAllSectionsCompleted(completed)
  // });

  const updateLayoutData = useCallback(
    (obj) => {
      setLayoutData(obj);
    },
    [setLayoutData]
  );
  //may not need to pass function to update completed because now
  return (
    <section className="create">
      <CreateNavbar allSectionsCompleted={allSectionsCompleted} />
      <Route exact path="/create">
        create default page text
      </Route>
      <CreateLayout layoutData={layoutData}>
        <Switch>
          <Route path="/create/photo">
            <Photo updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route path="/create/profile">
            <Profile updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route path="/create/work-experience">
            <WorkExperience updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route path="/create/education">
            <Education updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route path="/create/skills">
            <Skills updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route path="/create/contact">
            <Contact updateLayoutData={updateLayoutData} user={user} />
          </Route>
          <Route exact path="/create/view">
            <View user={user} />
          </Route>
        </Switch>
      </CreateLayout>
    </section>
  );
}
