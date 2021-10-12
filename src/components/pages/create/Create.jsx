import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
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
export default function Create({
  user,
  sessionActive,
  logUserOut,
  openAlert,
  openConfirm,
  completedSections,
  updateCompletedSections,
  incomplete,
}) {
  const [layoutData, setLayoutData] = useState({
    section: "",
    headerText: "",
    toolTip: "",
  });
  const [viewing, setViewing] = useState(false);

  useEffect(() => {
    if (user) {
      updateCompletedSections();
    }
  }, [user]);

  const updateLayoutData = useCallback(
    (obj) => {
      setLayoutData(obj);
    },
    [setLayoutData]
  );

  const updateViewing = (bool) => {
    setViewing(bool);
  };

  useLayoutUpdater(layoutData, updateLayoutData);
  return (
    <CreatePageLayout
      sessionActive={sessionActive}
      logUserOut={logUserOut}
      user={user || null}
      viewing={viewing}
      updateViewing={updateViewing}
      incomplete={incomplete}
    >
      {user ? (
        <section className="create">
          <Switch>
            <Route exact path="/create/view">
              <View user={user} updateViewing={updateViewing} />
            </Route>
            <CreateLayout
              layoutData={layoutData}
              user={user}
              completedSections={completedSections}
            >
              <Route exact path="/create">
                {user.userId === "BREEZEID_M5B6M16" ? (
                  <>
                    <h1 className="heading-primary">Welcome!</h1>
                    <p className="text-large margin-top-extra-small">
                      Take a moment to explore our friend Maria's CV. See the
                      finished product by clicking 'view CV'. You can even make
                      changes to see how everything works. Sign out when you are
                      ready to make your own account. It's free!
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="heading-primary">
                      Hello, {user.firstName}!
                    </h1>
                    <p className="text-large margin-top-extra-small">
                      Add your information to each cv section. Save all of the
                      changes before you move on! When all sections have been
                      been completed you can preview the final document. Return
                      as needed to edit or update your cv!
                    </p>
                  </>
                )}
              </Route>
              <Route path="/create/photo">
                <Photo
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openConfirm={openConfirm}
                />
              </Route>
              <Route path="/create/profile">
                <Profile
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openConfirm={openConfirm}
                />
              </Route>
              <Route path="/create/workexperience">
                <WorkExperience
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openAlert={openAlert}
                  openConfirm={openConfirm}
                />
              </Route>
              <Route path="/create/education">
                <Education
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openAlert={openAlert}
                  openConfirm={openConfirm}
                />
              </Route>
              <Route path="/create/skills">
                <Skills
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openAlert={openAlert}
                  openConfirm={openConfirm}
                />
              </Route>
              <Route path="/create/contact">
                <Contact
                  updateLayoutData={updateLayoutData}
                  updateCompletedSections={updateCompletedSections}
                  user={user}
                  openConfirm={openConfirm}
                />
              </Route>
            </CreateLayout>
          </Switch>
        </section>
      ) : (
        <div className="empty-preview-warning">
          sign up or sign in to create your cv
        </div>
      )}
    </CreatePageLayout>
  );
}
