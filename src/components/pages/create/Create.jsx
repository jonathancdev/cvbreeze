import React, { useState, useEffect, useCallback } from "react";
import CreateNavbar from "./CreateNavbar";
import checkCompletedSections from "../../../utilities/checkCompletedSections";
import CreatePageLayout from "../../layout/CreatePageLayout";
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
import useLayoutUpdater from "../../../hooks/useLayoutUpdater";
export default function Create({ user, sessionActive, logUserIn, logUserOut }) {
  const [layoutData, setLayoutData] = useState({
    section: "",
    headerText: "",
    toolTip: "",
  });
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    if (user) {
      updateCompletedSection(checkCompletedSections());
    }
  }, [user]);

  const updateCompletedSection = (obj) => {
    //SAVESECTION IN EACH SECTION CHECKS ALL SECTION STORAGE MEETS REQS AND
    //IN SOME COMPONENTS ALSO IN DELETE FUNCTION
    //PASSES OBJ BACK TO UPDATE STATE HERE
    setCompletedSections({ ...obj });
  };
  const updateLayoutData = useCallback(
    (obj) => {
      setLayoutData(obj);
    },
    [setLayoutData]
  );

  useLayoutUpdater(layoutData, updateLayoutData);

  return (
    <CreatePageLayout
      sessionActive={sessionActive}
      logUserOut={logUserOut}
      user={user}
    >
      <section className="create">
        <CreateLayout
          layoutData={layoutData}
          user={user}
          completedSections={completedSections}
        >
          <Switch>
            <Route exact path="/create">
              <h1 className="heading-primary">Welcome!</h1>
              <p className="text-large margin-top-extra-small">
                Take a moment to explore our friend Maria's CV. See the finished
                product by clicking 'view CV'. You can even make changes to see
                how everything works. Sign out when you are ready to make your
                own account. It's free!
              </p>
            </Route>
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
            <Route path="/create/workexperience">
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
    </CreatePageLayout>
  );
}
