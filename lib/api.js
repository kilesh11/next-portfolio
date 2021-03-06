async function fetchAPI(query, { variables } = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data;
}

export async function getRecentProfile() {
    const data = fetchAPI(`
    {
      profiles(sort: "date:desc", limit: 1) {
        date
        description
        icon {
          url
        }
        skills(sort: "proficiency:desc") {
          name
          type
          proficiency
        }
      }
    }
  `);
    return data;
}

export async function getPreviewPostBySlug(slug) {
    const data = await fetchAPI(
        `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
        {
            variables: {
                where: {
                    slug,
                },
            },
        },
    );
    return data?.posts[0];
}

export async function getAllPostsWithSlug() {
    const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
    return data;
}

export async function getAllProjectForHome() {
    const data = fetchAPI(`
    {
      projects(sort: "date:desc") {
        slug
        title
        excerpt
        demo
        github
        coverImage {
          url
        }
        skills(sort: "type, name:asc") {
          name
          type
        }
      }
    }
  `);
    return data;
}

export async function getAllPostsForHome(preview = false) {
    const data = await fetchAPI(
        `
    query Posts($where: JSON){
      posts(sort: "date:desc", where: $where) {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
        {
            variables: {
                where: {
                    ...(preview ? {} : { status: 'published' }),
                },
            },
        },
    );
    return data?.posts;
}

export async function getPostAndMorePosts(slug, preview = false) {
    const data = await fetchAPI(
        `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
        {
            preview,
            variables: {
                where: {
                    slug,
                    ...(preview ? {} : { status: 'published' }),
                },
                where_ne: {
                    ...(preview ? {} : { status: 'published' }),
                    slug_ne: slug,
                },
            },
        },
    );
    return data;
}
