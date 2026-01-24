const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '_products');

if (!fs.existsSync(productsDir)) {
    console.error(`Directory not found: ${productsDir}`);
    process.exit(1);
}

async function processFiles() {
    console.log("Checking GitHub repository visibility for products...");
    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filePath = path.join(productsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract repository from frontmatter
        // Look for repository: "User/Repo" or repository: User/Repo
        const repoMatch = content.match(/^repository:\s*["']?([\w\-\/]+)["']?/m);

        if (repoMatch && repoMatch[1]) {
            const repo = repoMatch[1];

            // Checks for dev_stage override
            const stageMatch = content.match(/^dev_stage:\s*["']?([\w\-\s]+)["']?/m);
            const devStage = stageMatch ? stageMatch[1].toLowerCase() : null;

            if (devStage === 'concept' || devStage === 'in-dev' || devStage === 'alpha') {
                console.log(`- ${file} -> ${repo}: Stage is '${devStage}'. Forcing repo_public: false.`);
                updateRepoStatus(filePath, content, false);
                continue;
            }

            process.stdout.write(`- ${file} -> ${repo}: `);

            try {
                const res = await fetch(`https://api.github.com/repos/${repo}`);
                const isPublic = res.status === 200;

                if (res.status === 404) {
                    process.stdout.write("PRIVATE/NOT FOUND (404). ");
                } else if (res.status === 200) {
                    process.stdout.write("PUBLIC (200). ");
                } else {
                    process.stdout.write(`STATUS ${res.status}. `);
                }

                updateRepoStatus(filePath, content, isPublic);

            } catch (err) {
                console.error(`\nError fetching ${repo}:`, err.message);
            }
        } else {
            console.log(`- ${file}: No repository field found.`);
        }
    }
}

function updateRepoStatus(filePath, content, isPublic) {
    let newContent = content;

    // 1. Update/Add repo_public
    const repoPublicRegex = /^repo_public:\s*(true|false)/m;
    if (repoPublicRegex.test(content)) {
        const currentVal = content.match(repoPublicRegex)[1] === 'true';
        if (currentVal !== isPublic) {
            newContent = newContent.replace(repoPublicRegex, `repo_public: ${isPublic}`);
            console.log(`Updated repo_public to ${isPublic}`);
        }
    } else {
        if (newContent.startsWith('---')) {
            const newline = newContent.indexOf('\n');
            const insertion = `repo_public: ${isPublic}\n`;
            newContent = newContent.slice(0, newline + 1) + insertion + newContent.slice(newline + 1);
            console.log(`Added repo_public: ${isPublic}`);
        }
    }

    // 2. Ensure published is true if it was set to false by previous logic, or just ensure it's true?
    // The previous script forced published: isPublic. So private repos became published: false.
    // We want to reverse this. Let's force published: true for all checked products 
    // (unless manual override is desired, but let's assume existence in _products means published).

    // However, maybe just let's not force it every time if it's already true.
    const publishedRegex = /^published:\s*(true|false)/m;
    if (publishedRegex.test(newContent)) {
        const currentPublished = newContent.match(publishedRegex)[1] === 'true';
        if (!currentPublished) {
            newContent = newContent.replace(publishedRegex, `published: true`);
            console.log(`Updated published to true (was false)`);
        }
    } else {
        // If missing, add it? Or defaults to true? Jekyll defaults to true for collection items usually.
        // But for safety, let's add it.
        if (newContent.startsWith('---')) {
            const newline = newContent.indexOf('\n');
            const insertion = `published: true\n`;
            newContent = newContent.slice(0, newline + 1) + insertion + newContent.slice(newline + 1);
            console.log(`Added published: true`);
        }
    }

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
}

processFiles();
