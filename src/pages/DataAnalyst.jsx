import Card from '../components/Card'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import BackToTop from '../components/BackToTop'

const useCases = {
  personal: [
    { tag: 'Finance', tagCls: 'tag-green', icon: '💰', title: 'Daily expense tracking', desc: 'Log every purchase in a spreadsheet. After 30 days, the patterns emerge — that daily coffee habit costs more than you thought, or your grocery bill spikes every Sunday.' },
    { tag: 'Finance', tagCls: 'tag-green', icon: '📊', title: 'Budget vs actual analysis', desc: 'Set a monthly budget per category. Track actual spending weekly. Data shows where you consistently overspend — the gap between plan and reality is where the savings are.' },
    { tag: 'Finance', tagCls: 'tag-teal', icon: '📈', title: 'Net worth trend', desc: 'Update a simple spreadsheet with your assets and liabilities monthly. A graph of your net worth over 12 months shows progress that feels invisible in daily life.' },
{ tag: 'Finance', tagCls: 'tag-orange', icon: '🎯', title: 'Subscription audit', desc: "List every subscription you pay for. Most people discover 2-3 they forgot about. Add the renewal date column — you'll notice patterns in annual vs monthly value." },
{ tag: 'Finance', tagCls: 'tag-purple', icon: '🛒', title: 'Grocery price memory', desc: "Track prices of 10 staple items. Build a mental model of what 'a good price' is. Over time, you'll naturally stop buying when prices are above average." },
  ],
  time: [
    { tag: 'Productivity', tagCls: 'tag-blue', icon: '⏰', title: 'Time audit', desc: 'For one week, log what you do every 30 minutes. Most people are shocked to find they work 3–4 hours effectively, not 8. Data reveals where the time actually goes.' },
    { tag: 'Productivity', tagCls: 'tag-teal', icon: '🎯', title: 'Deep work tracking', desc: 'Log when you do your best, most focused work. Block that time on your calendar. Protect it like a meeting with your most important client — because it is.' },
    { tag: 'Productivity', tagCls: 'tag-purple', icon: '📱', title: 'Screen time reality check', desc: "Check your phone's built-in screen time report weekly. Set a cap. Watch the number for 30 days — awareness alone changes behaviour more than willpower." },
    { tag: 'Time', tagCls: 'tag-orange', icon: '🚗', title: 'Commute time optimisation', desc: 'Track journey times for different routes at different hours for 2 weeks. The data often reveals a 15–20 minute saving that becomes free time every single day.' },
    { tag: 'Time', tagCls: 'tag-amber', icon: '⚡', title: 'Meeting cost calculator', desc: 'Multiply average hourly salary by number of attendees by meeting hours per week. Most teams are shocked at what meetings actually cost. Data makes the ROI of every meeting visible.' },
  ],
  health: [
    { tag: 'Sleep', tagCls: 'tag-blue', icon: '😴', title: 'Sleep quality tracking', desc: 'Rate your sleep 1–10 each morning alongside variables: late caffeine, screen time before bed, exercise, stress. After 4 weeks, patterns reveal what actually helps you sleep better.' },
    { tag: 'Nutrition', tagCls: 'tag-orange', icon: '🍔', title: 'Meal & energy correlation', desc: 'Rate your energy level 2 hours after each meal. Over time, data shows which foods give you sustained energy versus those causing afternoon crashes.' },
    { tag: 'Exercise', tagCls: 'tag-blue', icon: '💪', title: 'Workout progress tracking', desc: 'Log reps, weights, or distances. Seeing the upward trend in a chart is far more motivating than relying on memory — and shows you when you have plateaued.' },
    { tag: 'Mood', tagCls: 'tag-purple', icon: '😊', title: 'Mood & trigger analysis', desc: 'Log daily mood (1–10) alongside sleep, exercise, social interaction, diet. Patterns emerge showing exactly what most affects your mental state.' },
    { tag: 'Hydration', tagCls: 'tag-teal', icon: '💧', title: 'Water intake vs focus', desc: 'Track glasses of water alongside focus ratings. Most people discover they are chronically underhydrated and that it correlates strongly with afternoon productivity.' },
    { tag: 'Weight', tagCls: 'tag-amber', icon: '📉', title: 'Weight trend analysis', desc: 'Daily weight fluctuates by 1–3kg for normal reasons. Tracking the 7-day rolling average removes the noise and shows the real underlying trend.' },
  ],
  business: [
    { tag: 'Sales', tagCls: 'tag-blue', icon: '💵', title: 'Sales trend analysis', desc: 'Track daily or weekly revenue. Spot your best-selling days, identify slow periods before they become crises, and see the impact of promotions with real numbers.' },
    { tag: 'Customers', tagCls: 'tag-green', icon: '👥', title: 'Customer behaviour patterns', desc: 'Which products do customers buy together? Which ones never get repeat purchases? Data answers these questions and guides stocking and marketing decisions.' },
    { tag: 'Social', tagCls: 'tag-orange', icon: '📹', title: 'Social media performance', desc: 'Track post reach, engagement rate, and follower growth weekly. Data shows which content types perform best, which time slots get most views.' },
    { tag: 'Operations', tagCls: 'tag-purple', icon: '🔧', title: 'Stock & inventory management', desc: 'Track what sells when. Data reveals seasonal demand, tells you the ideal restock quantities, and prevents over-ordering items that tie up cash.' },
    { tag: 'Performance', tagCls: 'tag-teal', icon: '🏆', title: 'KPI dashboards', desc: 'Define 5–10 numbers that matter to your work and track them weekly. A simple dashboard turns complex operations into a clear health score you can act on.' },
  ],
  tools: [
    { tag: 'Finance', tagCls: 'tag-green', icon: '🧾', title: 'YNAB / Money Manager / Spendee', desc: 'Purpose-built apps that automatically categorise transactions and show you spending breakdowns. YNAB is paid but powerful. Spendee and Money Manager have solid free tiers.' },
    { tag: 'Time', tagCls: 'tag-orange', icon: '⏱️', title: 'Toggl Track / Clockify', desc: 'One click to start/stop a timer. At the end of the week, you see exactly where your hours went. Both are free for personal use.' },
    { tag: 'Health', tagCls: 'tag-blue', icon: '🏃', title: 'Apple Health / Google Fit / Garmin', desc: 'Your phone already collects steps, sleep, and heart rate. Open the app and look at your weekly and monthly charts — you already have months of data.' },
    { tag: 'Dashboards', tagCls: 'tag-amber', icon: '🔥', title: 'Google Looker Studio', desc: 'Connect your Google Sheets data and build beautiful, interactive dashboards. Completely free. Drag-and-drop chart builder — no coding required.' },
  ],
}

const metrics = [
  { metric: 'Revenue', tells: 'Whether the business is growing', how: 'Daily / weekly' },
  { metric: 'Profit margin', tells: 'Whether growth is sustainable', how: 'Monthly' },
  { metric: 'Customer acquisition cost', tells: 'How expensive is getting a new customer', how: 'Monthly' },
  { metric: 'Repeat purchase rate', tells: 'How satisfied your customers are', how: 'Monthly' },
  { metric: 'Top 5 products / services', tells: 'Where to focus your energy', how: 'Weekly' },
  { metric: 'Cash runway', tells: 'How many months until money runs out', how: 'Weekly' },
]

const weekPlan = [
  { day: 'Day 1', action: 'Open Google Sheets. Create 5 columns: Date, Category, Amount, Budget, Notes. Log every expense today.', time: '10 minutes' },
  { day: 'Day 2–6', action: 'Continue logging expenses. Do not analyse yet — just collect.', time: '3 minutes/day' },
  { day: 'Day 7', action: 'Add a category summary using SUMIF. Create a pie chart. Look at your numbers with curiosity, not judgment.', time: '20 minutes' },
  { day: 'Week 2', action: 'Add one more data stream — habit tracker, sleep log, or time tracker.', time: '5 min/day' },
  { day: 'Month 1', action: 'Compare week 1 vs week 4. You will see at least one insight that surprises you and one change you want to make.', time: '30 minutes' },
]

export default function DataAnalyst() {
  return (
    <>
      <div className="topic">
        <div className="topic-header analytics">
          <div className="topic-tag analytics">📊 Data Analytics Guide</div>
          <h1>Data Analytics for<br/>Everyday Life</h1>
          <p>Use data to make better decisions about your money, health, time, and work — using free tools and 10 minutes a day.</p>
          <div className="topic-stats">
            <div className="t-stat"><span className="t-stat-ico">💡</span><div><div className="t-stat-val">5</div><div className="t-stat-lbl">Life areas</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🎯</span><div><div className="t-stat-val">20+</div><div className="t-stat-lbl">Use cases</div></div></div>
            <div className="t-stat"><span className="t-stat-ico">🛠️</span><div><div className="t-stat-val">4</div><div className="t-stat-lbl">Free tools</div></div></div>
          </div>
        </div>
      </div>

      <div className="topic-divider"><hr/></div>

      <div className="topic">
        {/* Personal Finance */}
        <Card icon="🏠" bgColor="#dcfce7" title="1 — Home & Personal Finance" subtitle="Track spending, budgets, and net worth to build financial clarity.">
          <div className="use-grid">
            {useCases.personal.map((uc, i) => (
              <div key={i} className="use-card">
                <div className={`use-tag ${uc.tagCls}`}>{uc.tag}</div>
                <div className="use-ico">{uc.icon}</div>
                <h4>{uc.title}</h4>
                <p>{uc.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Time & Productivity */}
        <Card icon="📅" bgColor="#dbeafe" title="2 — Time & Productivity" subtitle="Understand where hours go and protect your best time.">
          <div className="use-grid">
            {useCases.time.map((uc, i) => (
              <div key={i} className="use-card">
                <div className={`use-tag ${uc.tagCls}`}>{uc.tag}</div>
                <div className="use-ico">{uc.icon}</div>
                <h4>{uc.title}</h4>
                <p>{uc.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Health & Fitness */}
        <Card icon="🏋️" bgColor="#fee2e2" title="3 — Health & Fitness" subtitle="Log sleep, nutrition, exercise, and mood to find what works for you.">
          <div className="use-grid">
            {useCases.health.map((uc, i) => (
              <div key={i} className="use-card">
                <div className={`use-tag ${uc.tagCls}`}>{uc.tag}</div>
                <div className="use-ico">{uc.icon}</div>
                <h4>{uc.title}</h4>
                <p>{uc.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Business & Work */}
        <Card icon="💼" bgColor="#dbeafe" title="4 — Business & Work" subtitle="Make better decisions faster — whether you run a business or work for one.">
          <div className="use-grid">
            {useCases.business.map((uc, i) => (
              <div key={i} className="use-card">
                <div className={`use-tag ${uc.tagCls}`}>{uc.tag}</div>
                <div className="use-ico">{uc.icon}</div>
                <h4>{uc.title}</h4>
                <p>{uc.desc}</p>
              </div>
            ))}
          </div>
          <h3 className="lbl">Key metrics worth tracking for any small business</h3>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Metric</th><th>What it tells you</th><th>How often</th></tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={i}>
                    <td><strong>{m.metric}</strong></td>
                    <td>{m.tells}</td>
                    <td>{m.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Travel & Decisions */}
        <Card icon="🌍" bgColor="#ccfbf1" title="5 — Travel & Everyday Decisions" subtitle="Use data to choose smarter — from commute routes to big life choices.">
          <Note type="info" icon="💡" title="Weighted Decision Matrix">For big decisions (job offer, moving city, buying a car), list your criteria, weight them by importance, and score each option. Data removes emotion and shows the clearest choice.</Note>
          <h3 className="lbl">Decision matrix example — choosing between two job offers</h3>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Criteria</th><th>Weight</th><th>Job A score</th><th>Job B score</th><th>A weighted</th><th>B weighted</th></tr>
              </thead>
              <tbody>
                <tr><td>Salary</td><td>30%</td><td>8</td><td>10</td><td>2.4</td><td>3.0</td></tr>
                <tr><td>Work-life balance</td><td>25%</td><td>9</td><td>6</td><td>2.25</td><td>1.5</td></tr>
                <tr><td>Growth prospects</td><td>20%</td><td>7</td><td>9</td><td>1.4</td><td>1.8</td></tr>
                <tr><td>Location / commute</td><td>15%</td><td>10</td><td>5</td><td>1.5</td><td>0.75</td></tr>
                <tr><td>Company culture</td><td>10%</td><td>8</td><td>7</td><td>0.8</td><td>0.7</td></tr>
                <tr><td><strong>Total score</strong></td><td>100%</td><td>—</td><td>—</td><td><strong>8.35 ✓</strong></td><td><strong>7.75</strong></td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tools */}
        <Card icon="🛠️" bgColor="#ede9fe" title="6 — Tools to Get Started Today" subtitle="All free or freemium. No programming required.">
          <div className="tool-list">
            {useCases.tools.map((t, i) => (
              <div key={i} className="tool-item">
                <span className="tool-ico">{t.icon}</span>
                <div className="tool-info">
                  <span className={`tool-tag ${t.tagCls}`}>{t.tag}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="lbl">Your first week action plan</h3>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Day</th><th>Action</th><th>Time needed</th></tr>
              </thead>
              <tbody>
                {weekPlan.map((w, i) => (
                  <tr key={i}>
                    <td><strong>{w.day}</strong></td>
                    <td>{w.action}</td>
                    <td>{w.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note type="purple" icon="🎓" title="The most important thing">Start with one area that genuinely bothers you — money, time, or health. Collect data for 30 days before trying to draw conclusions. Patterns only emerge with enough data. Do not stop after one week.</Note>
        </Card>
      </div>

      <BackToTop />
    </>
  )
}
