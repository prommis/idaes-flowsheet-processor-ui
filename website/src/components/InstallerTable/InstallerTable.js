import React, { useState, useEffect } from 'react';

function parseProjectVersionNumber(text, projectName) {
  const regex = new RegExp(`${projectName} version: (\\d+(?:\\.\\d+)*(?:\\w+)?)`, 'i');
  const match = text.match(regex);
  return match ? match[1] : null;
}

function parseUIVersionNumber(str) {
  if (!str) return null;
  // Matches one or more digits followed by two or more dot-separated groups of digits (thanks Cborg)
  const versionRegex = /(\d+(?:\.\d+){2,})/; 
  const match = str.match(versionRegex);
  return match ? match[0] : null;
}

const projects = {
  watertap: "WaterTAP",
  prommis: "PrOMMiS",
  idaes: "IDAES"
}


const styles = {
  container: {
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    // color: 'black',
    backgroundColor: "var(--table-bg-color)",
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
  th: {
    // backgroundColor: '#3A3A3E',
    border: '1px solid #ccc',
    padding: 10,
    textAlign: 'center',
  },
  td: {
    border: '1px solid #ccc',
    padding: 10,
    textAlign: 'center',
  },
  stableReleaseTd: {
    fontWeight: 'bold',
    backgroundColor: "var(--stable-release-row)",
  },
  button: {
    padding: '5px 10px',
    backgroundColor: "var(--ifm-color-primary)",
    color: 'var(--download-button-text)',
    border: 'none',
    borderRadius: 3,
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
};

function InstallerTable({owner, repo}) {
  const [projectLevelReleases, setProjectLevelReleases] = useState([]);
  const [electronBuildReleases, setElectronBuildReleases] = useState([]);
  const [fetchedProject, setFetchedProject] = useState(false);
  const [fetchedElectronBuild, setFetchedElectronBuild] = useState(false);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const project = repo === "idaes-pse" ? "idaes" : repo.toLowerCase();
  const project_name = projects[project];

  // This function filters out releases that do not have a UI artifact
  const formatProjectReleaseData = (data) => {
    let releasesWithInstaller = []
    for (let release of data) {
        if (release.assets?.length > 0) {
            for (let asset of release.assets) {
                if (asset.name.endsWith(".exe") || asset.name.endsWith(".dmg")) {
                    releasesWithInstaller.push(release)
                    break
                }
            }
        }
    }
    if (releasesWithInstaller.length > 0) {
      setProjectLevelReleases(releasesWithInstaller);
    } 
    setFetchedProject(true);
  }

  const fetchProjectReleases = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
        if (!response.ok) {
          setFetchedProject(true);
          throw new Error(`Failed to fetch releases: ${response.status}`);
        }
        const releasesData = await response.json();
        formatProjectReleaseData(releasesData)

      } catch (error) {
        setError(true);
        setFetchedProject(true);
      }
    };

  const fetchElectronBuildReleases = async () => {
    // check the idaes-electron-build repo for releases
    try {
      const response = await fetch(`https://api.github.com/repos/prommis/idaes-electron-build/releases`);
      if (!response.ok) {
        setFetchedElectronBuild(true);
        throw new Error(`Failed to fetch releases: ${response.status}`);
      }
      const releasesData = await response.json();
      formatElectronBuildReleaseData(releasesData)

    } catch (error) {
      setError(true);
      setFetchedElectronBuild(true);
    }
  }

  const formatElectronBuildReleaseData = (data) => {
    let releasesWithInstaller = []
    for (let release of data) {
        if (release.assets?.length > 0) {
            for (let asset of release.assets) {
                if (asset.name.toLowerCase().includes(project) && (asset.name.endsWith(".exe") || asset.name.endsWith(".dmg"))) {
                    releasesWithInstaller.push(release)
                    break
                }
            }
        }
    }
    setElectronBuildReleases(releasesWithInstaller)
    setFetchedElectronBuild(true);
  }

  useEffect(() => {
    fetchProjectReleases();
    fetchElectronBuildReleases();
  }, [owner, repo]);

  useEffect(() => {
      if (fetchedElectronBuild && fetchedProject) {
        const all_releases = [...projectLevelReleases, ...electronBuildReleases];
        all_releases.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setReleases(all_releases.slice(0, 10))
        setLoading(false);
      }
  }, [fetchedElectronBuild, fetchedProject]);



  const populateTable = () => {
    if (loading) {
      return <tr><td style={styles.td} colSpan={4}>Loading...</td></tr>;
    }
    if (error) {
      return <tr><td style={styles.td} colSpan={4}>Error loading data</td></tr>;
    }
    if (releases.length === 0) {
      return <tr><td style={styles.td} colSpan={4}>No releases found</td></tr>;
    }
    return releases.map((release, index) => {
      const version = release.tag_name;
      if (version.toLowerCase().includes('rc')) return null;

      const windowsLink = release.assets.find(asset => asset.name.toLowerCase().includes(project) && asset.name.endsWith(".exe"));
      const macLink = release.assets.find(asset => asset.name.toLowerCase().includes(project) && asset.name.endsWith(".dmg"));

      let UI_version = parseUIVersionNumber(windowsLink?.name || "");
      if (!UI_version) UI_version = parseUIVersionNumber(macLink?.name || "");

      // parse project version from body of release (this should be available in electron build releases)
      let projectVersion = parseProjectVersionNumber(release.body.toLowerCase(), project.toLowerCase())

      return (
        <tr key={version} style={index === 0 ? { ...styles.td, ...styles.stableReleaseTd } : styles.td}>
          <td style={index === 0 ? { ...styles.td, ...styles.stableReleaseTd } : styles.td}>{UI_version}</td>
          <td style={index === 0 ? { ...styles.td, ...styles.stableReleaseTd } : styles.td}>{projectVersion || version}</td>
          <td style={index === 0 ? { ...styles.td, ...styles.stableReleaseTd } : styles.td}>
            {windowsLink ? (
              <a href={windowsLink.browser_download_url} target="_blank" rel="noreferrer" style={styles.link}>
                <button style={styles.button}>Download</button>
              </a>
            ) : (
              '-'
            )}
          </td>
          <td style={index === 0 ? { ...styles.td, ...styles.stableReleaseTd } : styles.td}>
            {macLink ? (
              <a href={macLink.browser_download_url} target="_blank" rel="noreferrer" style={styles.link}>
                <button style={styles.button}>Download</button>
              </a>
            ) : (
              '-'
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <p>
        Choose a download link below to download the application. For more information on usage see the <a href='../HowTo/how_to_use_ui'>HowTo</a> section.
      </p>
      <div style={styles.container}>
        <h1 style={styles.header}>Software Releases</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>UI Version</th>
              <th style={styles.th}>{project_name} Version</th>
              <th style={styles.th}>Windows (.exe)</th>
              <th style={styles.th}>macOS (.dmg)</th>
            </tr>
          </thead>
          <tbody>
            {populateTable()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstallerTable;
