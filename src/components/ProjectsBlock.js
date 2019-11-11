import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import { getPages, Link, safePrefix } from "../utils";

export default class ProjectsBlock extends React.Component {
  render() {
    let display_projects = _.get(
      this.props,
      "pageContext.site.data.projects.projects"
    );
    let recent_projects = display_projects.slice(
      0,
      _.get(this.props, "section.num_projects_displayed")
    );
    return (
      <section id={_.get(this.props, "section.section_id")} className="block">
        <h2 className="block-title underline">
          {_.get(this.props, "section.title")}
        </h2>
        <div className="post-feed">
          {_.map(
            recent_projects,
            (project, project_idx) =>
              project.title && (
                <article key={project_idx} className="post">
                  <div className="post-inside">
                    {_.get(project, "image") && (
                      <Link
                        className="post-thumbnail"
                        to={safePrefix(_.get(project, "portfolioPage"))}
                      >
                        <img
                          className="thumbnail"
                          src={safePrefix(_.get(project, "image"))}
                          alt={_.get(project, "title")}
                        />
                      </Link>
                    )}
                    <header className="post-header">
                      <h3 className="post-title">
                        <Link
                          to={safePrefix(_.get(project, "portfolioPage"))}
                          rel="bookmark"
                        >
                          {_.get(project, "title")}
                        </Link>
                      </h3>
                    </header>
                    <div className="post-content">
                      <p>{_.get(project, "excerpt")}</p>
                    </div>
                  </div>
                </article>
              )
          )}
        </div>
        {_.get(this.props, "section.actions") && (
          <p className="block-cta">
            {_.map(
              _.get(this.props, "section.actions"),
              (action, action_idx) => (
                <Link
                  key={action_idx}
                  to={safePrefix(_.get(action, "url"))}
                  className="button"
                >
                  {_.get(action, "label")}
                </Link>
              )
            )}
          </p>
        )}
      </section>
    );
  }
}
