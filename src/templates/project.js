import React from "react";
import _ from "lodash";

import { Layout } from "../components/index";
import { htmlToReact, Link, safePrefix } from "../utils";

export default class Project extends React.Component {
  render() {
    let display_projects = _.get(
      this.props,
      "pageContext.site.data.projects.projects"
    );
    return (
      <Layout {...this.props}>
        <header className="post-header">
          <h1 className="post-title underline">
            {_.get(this.props, "pageContext.frontmatter.title")}
          </h1>
        </header>
        {_.get(this.props, "pageContext.frontmatter.subHeading") && (
          <div className="post-subtitle">
            {htmlToReact(
              _.get(this.props, "pageContext.frontmatter.subHeading")
            )}
          </div>
        )}
        <div className="project-feed">
          {_.map(
            display_projects,
            (project, project_idx) =>
              project.title && (
                <article key={project_idx} className="project">
                  <div className="post-inside">
                    <img
                      className="thumbnail"
                      src={safePrefix(_.get(project, "image"))}
                      alt={_.get(project, "title")}
                    />
                    <header className="post-header">
                      <h2 className="post-title">{_.get(project, "title")}</h2>
                    </header>
                    <div className="post-content">
                      <p>{_.get(project, "excerpt")}</p>
                    </div>
                    <footer className="project-meta">
                      <React.Fragment>
                        <Link
                          to={safePrefix(_.get(project, "url"))}
                          className={`button`}
                        >
                          Live Application
                        </Link>
                        <Link
                          to={safePrefix(_.get(project, "url"))}
                          className={`button`}
                        >
                          Source Code
                        </Link>
                      </React.Fragment>
                    </footer>
                  </div>
                </article>
              )
          )}
        </div>
      </Layout>
    );
  }
}
